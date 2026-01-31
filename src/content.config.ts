import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const changelog = defineCollection({
	loader: glob({ base: './src/content/changelog', pattern: '**/*.md' }),
	schema: z.object({
		week: z.string().optional(),
		date: z.coerce.date(),
		title: z.string(),
		summary: z.string().optional(),
		isMajor: z.boolean().optional().default(false),
		author: z.string().optional(),
		changes: z
			.array(
				z.object({
					type: z.enum(['feature', 'improvement', 'fix', 'breaking', 'docs', 'chore']).optional(),
					title: z.string(),
					description: z.string().optional(),
				}),
			)
			.optional(),
	}),
});

export const collections = { blog, changelog };
