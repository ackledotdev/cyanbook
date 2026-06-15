import {
	FRQTest,
	FRQTestSchema,
	MCQTest,
	MCQTestSchema,
	SomeTest
} from '../schema';

export function obfuscateTestData(data: SomeTest): string {
	const json = JSON.stringify(data);
	return btoa(json);
}

export function deobfuscateTestData(
	encoded: string,
	filename: undefined
): SomeTest;
export function deobfuscateTestData(
	encoded: string,
	filename: true
): { test: SomeTest; filename: string };
export function deobfuscateTestData(encoded: string, filename?: true) {
	const json = atob(encoded);

	let finalData: SomeTest;

	let data;
	try {
		data = JSON.parse(json);
	} catch (e) {
		throw new Error('Failed to deserialize test data');
	}

	if (!data.type) throw new Error('Invalid test data: missing type');

	if (data.type === 'FRQ') {
		const result = FRQTestSchema.safeParse(data);
		if (!result.success)
			throw new Error('Invalid FRQ test data: ' + result.error.message);
		finalData = result.data as FRQTest;
	} else if (data.type === 'MCQ') {
		const result = MCQTestSchema.safeParse(data);
		if (!result.success)
			throw new Error('Invalid MCQ test data: ' + result.error.message);
		finalData = result.data as MCQTest;
	} else throw new Error('Invalid test data: unknown type');

	const d = new Date();
	return filename
		? {
				test: finalData,
				filename:
					finalData.comment ??
					`test_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}` +
						'.txt'
			}
		: finalData;
}
