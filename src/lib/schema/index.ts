import { FRQTest, StdFRQTest } from './FRQ';
import { MCQTest, StdMCQTest } from './MCQ';

export * from './MCQ';
export * from './FRQ';

export type SomeTest = FRQTest | MCQTest;
export type SomeStdTest = StdFRQTest | StdMCQTest;
