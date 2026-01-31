import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const MODEL = 'moonshotai/kimi-k2.5';

function arg(name, def = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  if (!v || v.startsWith('--')) return true;
  return v;
}

function argsAll(name) {
  const out = [];
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] !== `--${name}`) continue;
    const v = process.argv[i + 1];
    if (v && !v.startsWith('--')) out.push(v);
  }
  return out;
}

function slugify(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64);
}

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function sh(cmd, cwd) {
  return execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString('utf8').trim();
}

function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

async function openRouterChat({ apiKey, messages }) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.2
    })
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`OpenRouter non-JSON response (HTTP ${res.status}): ${text.slice(0, 500)}`);
  }

  if (!res.ok) {
    throw new Error(`OpenRouter error (HTTP ${res.status}): ${JSON.stringify(data).slice(0, 800)}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error(`OpenRouter empty completion: ${JSON.stringify(data).slice(0, 800)}`);
  return content;
}

function buildPrompt({ today, projectSlug, projectName, since, until, commits }) {
  return [
    {
      role: 'system',
      content:
        'You are generating a concise, user-facing weekly changelog from git commits. ' +
        'CRITICAL: Your response MUST begin with a YAML frontmatter block. ' +
        'The very first characters of the response MUST be three dashes: --- on its own line. ' +
        'Output MUST be valid Markdown with a YAML frontmatter block at the top. ' +
        'Do not include code fences around the YAML. ' +
        'Write in simple, skimmable bullets. ' +
        'Do NOT mention internal file paths. ' +
        'Do NOT invent features not present in commits. ' +
        'Return ONLY the markdown document.'
    },
    {
      role: 'user',
      content:
        `Project: ${projectName}\n` +
        `ProjectSlug: ${projectSlug}\n` +
        `Today: ${today} (you MUST use this exact date in frontmatter.date)\n` +
        `Range: ${since} → ${until}\n\n` +
        'Write a changelog entry with frontmatter matching this schema:\n' +
        '- project: string (use ProjectSlug)\n' +
        '- week: string (optional)\n' +
        '- date: YYYY-MM-DD (MUST equal Today)\n' +
        '- title: string\n' +
        '- summary: string (optional)\n' +
        '- isMajor: boolean (optional)\n' +
        '- author: string (optional)\n' +
        '- changes: list of { type, title, description } where type in [feature, improvement, fix, breaking, docs, chore]\n\n' +
        'Body: 4-8 bullet points (not paragraphs). Keep them user-facing.\n\n' +
        'COMMITS (hash\tsubject\tbody):\n' +
        commits
    }
  ];
}

function ensureFrontmatter(md) {
  const raw = String(md || '');
  const trimmed = raw.trimStart();
  if (trimmed.startsWith('---')) return trimmed;

  // Try to recover if the model prepended chatter.
  const first = trimmed.indexOf('---');
  if (first !== -1) {
    const recovered = trimmed.slice(first).trimStart();
    if (recovered.startsWith('---')) return recovered;
  }

  const preview = trimmed.slice(0, 280).replace(/\s+/g, ' ');
  throw new Error(`Model output missing YAML frontmatter starting with --- (preview: ${preview})`);
}

async function main() {
  const since = arg('since', '7 days ago');
  const until = arg('until', 'now');

  const repos = argsAll('repo');
  const projects = argsAll('project');

  if (!repos.length) {
    throw new Error('Pass at least one --repo <path>. You can pass multiple --repo flags.');
  }

  const apiKey = mustEnv('OPENROUTER_API_KEY');

  const outDir = path.join(process.cwd(), 'src', 'content', 'changelog');
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const projectName = projects[i] || path.basename(repo);
    const projectSlug = slugify(projectName);

    const log = sh(
      `git log --since=${JSON.stringify(since)} --until=${JSON.stringify(until)} --pretty=format:%H\\t%s\\t%b --no-merges`,
      repo,
    );

    if (!log) {
      console.log(`No commits in range for ${projectName}; skipping.`);
      continue;
    }

    const messages = buildPrompt({
      today: isoDate(),
      projectSlug,
      projectName,
      since,
      until,
      commits: log,
    });

    const out = await openRouterChat({ apiKey, messages });
    const md = ensureFrontmatter(out);

    const file = path.join(outDir, `${isoDate()}-${projectSlug}.md`);
    fs.writeFileSync(file, md.trim() + '\n', 'utf8');

    console.log(`Wrote: ${file}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
