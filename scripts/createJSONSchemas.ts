import {
	FRQTestJSONSchema,
	MCQTestJSONSchema,
	StdFRQTestJSONSchema,
	StdMCQTestJSONSchema
} from '../src/lib/schema/index';
import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const _dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(_dirname, '..', 'public', 'schemas');

for (const [name, schema] of [
	['FRQTest', FRQTestJSONSchema],
	['MCQTest', MCQTestJSONSchema],
	['StdFRQTest', StdFRQTestJSONSchema],
	['StdMCQTest', StdMCQTestJSONSchema]
]) {
	const outputPath = join(outputDir, `${name}JSONSchema.json`);
	writeFile(outputPath, JSON.stringify(schema, null, 2)).then(() =>
		console.log(`Wrote JSON schema for ${name}`)
	);
}
