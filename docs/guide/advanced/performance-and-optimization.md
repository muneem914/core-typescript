---
outline: deep
---

# Performance and Optimization
TypeScript offers significant advantages in terms of code quality and maintainability, but like any powerful tool, it requires understanding to use efficiently. Performance and optimization in TypeScript primarily refer to the speed of the TypeScript compiler (tsc) and your IDE's responsiveness (IntelliSense, autocompletion), rather than the runtime performance of the compiled JavaScript (as TypeScript is a compile-time tool).

## Compiler Performance Tips
Efficient compilation is crucial for a smooth development experience. Here are strategies to enhance TypeScript compiler performance:
### 1. Use `incremental` Compilation
Enable incremental builds to speed up subsequent compilations by reusing information from previous compilations.
::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "incremental": true // Saves .tsbuildinfo for faster rebuilds
  }
}
```
:::
Dramatically reduces subsequent build times, especially in large projects.

### 2. Limit `include` and `exclude Paths`
Specify only necessary files and directories to reduce the compiler's workload.
::: code-group
```json [tsconfig.json]
{
  "include": ["src/**/*"], // Only compile files within the 'src' directory
  "exclude": ["node_modules", "dist", "**/*.spec.ts"] // Exclude these
}
```
:::
Reduces the total number of files the compiler needs to process.

### 3. Use `skipLibCheck`
Skip type checking of declaration files (`*.d.ts`) to speed up compilation, especially when using third-party libraries.
::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```
:::
Setting `"skipLibCheck": true` in `tsconfig.json` tells the compiler to skip type checking of declaration files (`*.d.ts`) that are located in `node_modules`. These are typically well-typed already.

Significant reduction in compilation time, especially for projects with many third-party dependencies.

### 4. Consider Project References (for Monorepos/Large Projects) 
For large projects or monorepos, you can break your codebase into smaller, interconnected TypeScript projects using `references` in `tsconfig.json` and a `composite` flag. This allows TypeScript to compile and type-check each sub-project independently, but still understand their relationships.
::: code-group
```json [tsconfig.json]
{
    "compilerOptions": { 
        "composite": true,
        // rest of them 
    },
    "references": [
        { "path": "./shared" },  // Sub-project
        { "path": "./frontend" } // Another sub-project
    ]
}
```
:::
Enables faster incremental builds across project boundaries and better caching for sub-projects.
### 5. Avoid Barrel Files
```ts
// Bad: imports entire library
import { Button, Card, Modal } from 'ui-library';

// Good: imports specific components
import Button from 'ui-library/Button';
```
It will reduce load time.
### 6. Avoid Overly Complex Types
Very deep, recursive, or complex conditional types can be computationally expensive for the TypeScript compiler to resolve. While powerful, overuse can lead to slower type-checking. It reduces the "thinking time" for the compiler.
### 7. Upgrade TypeScript Version
Newer TypeScript versions often include performance improvements. Regularly update to benefit from these enhancements.
### 8. Use Faster Transpilers (e.g., SWC, esbuild) for builds (optional)
While `tsc` is the official TypeScript compiler and type-checker, tools like `esbuild` or `SWC` are much faster at just transpiling (converting TS to JS) because they are written in highly optimized languages (Go and Rust, respectively) and focus only on transpilation, not type-checking. You can use these for rapid development builds and `tsc` for full type-checking in the background or as a pre-commit hook.

Significantly faster build times, especially for development servers. (Note: Microsoft is also working on a native Go port of `tsc` which promises similar speedups).

## Avoiding Excessive Type Checking
Sometimes, TypeScript can be too strict, or you might inadvertently write code that forces it to do more work than necessary.

Like airport security - essential checks good, strip-searching everyone bad.

### 1. Prefer Interfaces Over Intersections
Using interfaces can be more efficient than complex intersection types.
```ts
// Inefficient
type User = { name: string } & { age: number };

// Efficient
interface User {
  name: string;
  age: number;
}
```
### 2. Avoid Deeply Nested Types
Deeply nested types can lead to performance issues. Simplify or break them into smaller parts.
```ts
// Complex
type Complex = A & B & C & D & E;

// Simplified
interface Complex extends A, B, C, D, E {}
```
### 3. Simplify Complex Types
```ts
// Over-engineered
type DeepNested<T> = T extends object ? { 
  [K in keyof T]: DeepNested<T[K]> 
} : T;

// Simplified
type User = {
  id: string;
  profile: {
    name: string;
    age: number;
  };
};
```

### 4. Avoid Excessive Utility Types
```ts
// May cause slowdowns in large codebases
type SuperType = Partial<Readonly<Pick<User, 'id' | 'name'>>>;

// More maintainable
type SimpleUser = {
  readonly id?: string;
  readonly name?: string;
};
```

### 5. Use Type Aliases for Complex Types
Assign complex types to aliases to improve readability and maintainability.
```ts
type UserID = string | number;
```
Also, You can leave type `any` to temporarily bypass type checking
```ts
// Complex third-party library
const data: any = loadExternalData(); // Temporarily bypass type checking
```
## Debugging Type Errors
Type errors are TypeScript's way of telling you that your code doesn't match its declared types or expected behavior. Effective debugging of these errors is key to leveraging TypeScript's full power.
### 1. Leverage IDE Features
Modern IDEs like Visual Studio Code provide real-time type checking and suggestions.
```ts
// Hover over variables to see inferred types
const user = getUser(); // Hover shows: User | undefined
```
### 2. Read Error Messages
```ts
// Sample error:
// Type 'string | number' is not assignable to type 'number'
function add(a: number, b: number | string): number {
  return a + b; // Error
}
```
### 3. Use Type Narrowing
```ts
function addFixed(a: number, b: number | string): number {
  if (typeof b === 'string') {
    return a + Number(b); // Proper handling
  }
  return a + b; // Now b is definitely number
}
```
### 4. Implement Type Guards
Use type guards to narrow down types and prevent errors.
```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```
### 5. Utilize `unknown` Instead of `any`
Prefer `unknown` over `any` to enforce type checking.
```ts
let value: unknown = getValue();
if (typeof value === 'string') {
  // Now TypeScript knows value is a string
}
```
### 6. Use Type Assertions Sparingly
```ts
const element = document.getElementById('root') as HTMLElement; 
// When you're certain of the type
```
### 7. Use `tsc --noEmit` for Type Checking
Run the TypeScript compiler in type-checking mode without emitting output files.
```sh
tsc --noEmit
```
### Other ways that can help in debugging and resolving error
- Breaking down complex types
- Refactor for Clarity
- Understand `strictNullChecks` and **optional properties**
- Use `@ts-ignore` or `@ts-expect-error` (sparingly!)

## TypeScript Performance Optimization Cheat Sheet

| Technique          | Benefit                                       | Example (`tsconfig.json` or code)                   |
|--------------------|-----------------------------------------------|-----------------------------------------------------|
| **Incremental Builds** | Significantly faster subsequent rebuilds for large projects. | `"compilerOptions": { "incremental": true }`        |
| **Project References** | Isolated compilation, faster monorepo builds. | `root/tsconfig.json`: `"references": [{ "path": "./packages/core" }]` |
| **`skipLibCheck`** | Reduces compile time by skipping type checking of `.d.ts` files in `node_modules`. | `"compilerOptions": { "skipLibCheck": true }`       |
| **Optimize `include`/`exclude`** | Only compile necessary files.                 | `"include": ["src/**/*"], "exclude": ["node_modules", "dist"]` |
| **Avoid `any`** | Improves type safety, prevents accidental type issues. | Use `string`, `number`, `boolean`, interfaces, or `unknown` instead of `any`. |
| **Simple Types** | Faster type checking for the compiler.        | Avoid overly complex conditional types or deep, recursive type structures when possible. |
| **Type Narrowing** | Enables TypeScript to understand more specific types within blocks, leading to fewer false positives. | `if (typeof value === 'string') { /* value is string here */ }` |
| **`as const` Assertions** | Narrows literal types, can lead to more precise inference. | `const myTuple = [1, 2, 3] as const;` (Type: `readonly [1, 2, 3]`) |

### Real-World Performance Gains
```sh
# Before optimization
Compilation time: 45 seconds

# After optimization
Compilation time: 12 seconds (-73%)
```
*Actual results from a medium-sized React/TypeScript project (12,000 LOC)*