---
outline: deep
---

# Testing
Testing is the process of executing a program with the aim of finding errors. It is a crucial part of software development, and TypeScript enhances this process by bringing its static type-checking benefits directly into your test suite. This means you can catch many errors before running your tests, leading to more robust and reliable applications.

**Three types of testing are seen in practice:**
1. **Unit Tests**: Small individual test. For example: testing 1 function. Need to write may unit tests normally.
2. **ntegration Tests**: Test with dependencies. For example: test function that calls another function. It's more complex than unit testing and need to write less tests than unit testing.
3. **End-to-End Tests**: Complete test. For example: automate browser events. Most complex test and need to write less codes for testing.

## Using TypeScript with Testing Libraries (e.g., Jest)
Jest is a versatile testing framework that works well with TypeScript. It supports features like mocking, assertions, and code coverage. It is the de-facto standard for JavaScript/TypeScript testing due to its comprehensive features, excellent developer experience, and built-in support for TypeScript via ts-jest.\
(de-facto means --> holding a specified position in fact but not necessarily by legal right)

**Integration Steps**

1. **Install Jest and TypeScript Support**
```sh
npm install --save-dev jest ts-jest @types/jest
```
2. **Initialize Jest Configuration**
```sh
npx ts-jest config:init
```
A common `jest.config.js` might look like this:
```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript files
  testEnvironment: 'node', // Or 'jsdom' for browser environments (e.g., React apps)
  roots: ['<rootDir>/src'], // Where to look for test files
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ], // Pattern to find test files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform ts/tsx files with ts-jest
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Example: handle path aliases if you use them in tsconfig.json
  },
  collectCoverage: true, // Collect code coverage
  coverageDirectory: "coverage", // Output directory for coverage reports
  coverageProvider: "v8", // or "babel"
};
```
3. **Add Test Script to `package.json`**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```
4. **`tsconfig.json` considerations**
```json
{
  "compilerOptions": {
    // ... other options ...
    "types": ["jest", "node"] // explicitly include jest and node types
  }
}
```
5. **Write Tests**

Create test files with `*.test.ts` or `*.spec.ts` extensions. It means, suppose you have `calculator.ts` file which contains `multiply` function. Now you want to test this function. So you need to create a test file corresponding to that file whether its `calculator.test.ts` or `calculator.spec.ts`
::: code-group
```ts [/src/calculator.ts]
export function multiply(a: number, b: number): number {
  return a * b;
}
```
:::
::: code-group
```ts [/tests/calculator.test.ts]
import { multiply } from '../src/calculator';

test('multiplication', () => {
  expect(multiply(4, 5)).toBe(20);
});
```
:::

6. **Output Log**

Type `npm run test` in the terminal. So you can see the test results like this:
```sh
> test passed
✓ multiplication
```

## Writing Tests in TypeScript
Writing tests in TypeScript is largely similar to writing them in JavaScript, but with the added layer of type safety. This means your test code itself benefits from type checking, and you can ensure that the data you're passing to your functions under test (and expecting back) adheres to its defined types.

### Several benefits of writing test

* **Early Error Detection:** Catch type mismatches in your test data or function calls at **compile-time, not runtime**.
* **Improved Readability:** Explicit types in tests make it clearer what kind of input a function expects and what output it produces.
* **Better Refactoring:** If you change a function's signature in your main code, TypeScript will immediately flag errors in your tests, guiding you to update them.
* **Enhanced IntelliSense:** Autocompletion and hover-over type information work within your test files, just as they do in your source code.

## Type-Safe Mocks and Stubs
In unit testing, you often need to isolate the component being tested by replacing its dependencies with "dummy" objects called mocks or stubs. TypeScript helps ensure these dummies behave like the real thing, preventing subtle type-related bugs.

Mocks and stubs simulate parts of your application during testing. In TypeScript, ensuring these are type-safe prevents errors and improves test reliability.

::: code-group 
```ts [src/userService.ts]
export class UserService {
  getUser(id: number): string {
    return `User${id}`;
  }
}
```
:::
::: code-group 
```ts [tests/userService.test.ts]
import { UserService } from '../src/userService';

const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn().mockReturnValue('MockUser')
};

test('getUser returns MockUser', () => {
  expect(mockUserService.getUser(1)).toBe('MockUser');
});
```
:::
If you want to know more about Jest then go through their enriched [documentation](https://jestjs.io/docs/getting-started)

## Key Testing Strategies with TypeScript

| Technique           | Benefit                                            |
|---------------------|----------------------------------------------------|
| **Type Predicates** | Narrows types based on a runtime check within conditional blocks, providing safer access to properties. |
| **Utility Types** | Creates flexible and type-safe derived types for mocks, DTOs, or complex scenarios (e.g., `Partial<T>`, `Readonly<T>`). |
| **Type Assertions** | Allows you to explicitly tell TypeScript the type of a value when you have more specific knowledge than the compiler. Use sparingly and carefully. |
| **Generic Mocks** | Creates reusable, type-safe mock functions, especially useful for functions with varying arguments/return types. |