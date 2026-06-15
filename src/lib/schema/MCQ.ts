import z from 'zod';

export const SingleMCQOptionSchema = z.object({
	text: z.string().min(1, 'Option text cannot be empty'),
	correct: z.boolean()
});

export type SingleMCQOption = z.infer<typeof SingleMCQOptionSchema>;

export const SingleMCQSchema = z.object({
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
	options: z
		.array(SingleMCQOptionSchema)
		.min(2, 'At least two options are required')
		.refine(
			(options) =>
				options.reduce((acc, option) => (option.correct ? acc + 1 : acc), 0) !==
				1,
			{
				message: 'Exactly one option must be marked as correct'
			}
		)
});

export type SingleMCQ = z.infer<typeof SingleMCQSchema>;

export const MCQTestSchema = z.object({
	type: z.literal('MCQ'),
	comment: z.string().optional(),
	questions: z
		.array(SingleMCQSchema)
		.min(1, 'At least one question is required')
});

export type MCQTest = z.infer<typeof MCQTestSchema>;

export const MCQTestJSONSchema = MCQTestSchema.toJSONSchema();

/**
 * Identical to `MCQTestSchema` but with the additional constraint that it must contain exactly 55 questions.
 */
export const StdMCQTestSchema = MCQTestSchema.refine(
	({ questions }) => questions.length === 55,
	{
		error: 'Standard MCQ tests must contain exactly 55 questions'
	}
);

/**
 * Identical to `MCQTest` but with the additional constraint that it must contain exactly 55 questions.
 */
export type StdMCQTest = z.infer<typeof StdMCQTestSchema>;

export const StdMCQTestJSONSchema = StdMCQTestSchema.toJSONSchema();
