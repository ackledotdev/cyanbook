import z from 'zod';

export const SingleFRQSchema = z
	.object({
		type: z.enum(['poetry', 'prose', 'open']),
		prompt: z.string().min(1, 'Prompt is required'),
		passage: z
			.object({
				title: z.string().optional(),
				text: z.string().min(1, 'Passage text cannot be empty'),
				attribution: z.string().optional(),
				footnotes: z
					.array(z.string().min(1, 'Footnote cannot be empty'))
					.optional(),
				lineNumbers: z.boolean()
			})
			.optional(),
		textList: z.array(z.string().min(1, 'List item cannot be empty')).optional()
	})
	.refine((frq) => {
		if (frq.type === 'poetry') return !!frq.passage && !frq.textList;
		if (frq.type === 'prose') return !!frq.passage && !frq.textList;
		if (frq.type === 'open') return !frq.passage && !!frq.textList;
	});

export type SingleFRQ = z.infer<typeof SingleFRQSchema>;

export const FRQTestSchema = z.object({
	type: z.literal('FRQ'),
	comment: z.string().optional(),
	questions: z
		.array(SingleFRQSchema)
		.min(1, 'At least one question is required')
});

export type FRQTest = z.infer<typeof FRQTestSchema>;

export const FRQTestJSONSchema = FRQTestSchema.toJSONSchema();

/**
 * Identical to `FRQTest` but with the additional constraint that the three questions in order must be poetry, prose, and open-ended.
 */
export const StdFRQTestSchema = FRQTestSchema.refine(
	({ questions }) =>
		questions[0].type === 'poetry' &&
		questions[1].type === 'prose' &&
		questions[2].type === 'open' &&
		questions.length === 3,
	{
		message:
			'For a standard FRQ test, the first question must be poetry, the second must be prose, and the third must be open-ended'
	}
);

/**
 * Identical to `FRQTest` but with the additional constraint that the three questions in order must be poetry, prose, and open-ended.
 */
export type StdFRQTest = z.infer<typeof StdFRQTestSchema>;

export const StdFRQTestJSONSchema = StdFRQTestSchema.toJSONSchema();
