import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Only changelog content is used (no blog).
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

export const collections = { changelog };
