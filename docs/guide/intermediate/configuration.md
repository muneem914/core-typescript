---
outline: deep
---

# Configuration
The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project. 
## `tsconfig.json` Options
You can consider the `tsconfig.json` file is TypeScript’s project blueprint. It defines rules for compiling your code (e.g., target JavaScript version, file locations, strictness). It tells the compiler how to compile your code by setting various options. This file helps you manage settings for things like the target JavaScript version, module system, and more.

**What they includes:**
- **target**: the language used for the compiled output
- **module**: the module manager used in the compiled output. system is for SystemJS, commonjs for CommonJS.
- **moduleResolution**: the strategy used to resolve module declaration files (.d.ts files). With the node approach, they are loaded from the node_modules folder like a module (require('module-name'))
- **sourceMap**: generate or not source map files to debug directly your application TypeScript files in the browser,
- **emitDecoratorMetadata**: emit or not design-type metadata for decorated declarations in source,
- **experimentalDecorators**: enables or not experimental support for ES7 decorators,
- **removeComments**: remove comments or not
- **noImplicitAny**: allow or not the use of variables / parameters without types (implicit)

### Example: Basic `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES6",            // Compile to ECMAScript 6
    "module": "commonjs",       // Use CommonJS module system (Node.js)
    "outDir": "./dist",         // Output directory for compiled files
    "rootDir": "./src",         // Root directory of your source files
    "strict": true,             // Enable all strict type-checking options
    "esModuleInterop": true     // Enables compatibility with CommonJS modules
  },
  "include": ["src/**/*"],      // Include all files in the src folder to compile
  "exclude": ["node_modules"]   // Exclude node_modules from compilation
}
```
This configuration tells TypeScript to compile files in the `src` directory into ES6 JavaScript using CommonJS modules, output the compiled code to the `dist` folder, and enforce strict type-checking (more on this next).
::: tip Analogy
Think of `tsconfig.json` as the instruction manual for a factory that produces cars. It specifies what model (JavaScript target), assembly line (module system), output warehouse (outDir), and quality checks (strict mode) the cars must follow and meet.
:::
## Strict Mode
Strict Mode in TypeScript is a set of compiler options that enforce stricter type-checking and coding practices. When enabled (typically by setting `"strict": true` in `tsconfig.json`), it turns on several individual options that help catch common errors early in development.

**Key Points:**
- **noImplicitAny**: Requires explicit type annotations instead of defaulting to any.
- **strictNullChecks**: Ensures that null and undefined are not assignable to other types unless explicitly allowed.
- **strictFunctionTypes, strictPropertyInitialization**, etc.: Additional checks that promote robust and predictable code.
### Example 1: noImplicitAny
Without strict mode, TypeScript may allow parameters without explicit types:
```ts
// Without strict mode, TypeScript might infer 'any' 
// (Still you will get the output, but unsafe practice)
function greet(name) {   // Error: Parameter 'name' implicitly has an 'any' type.
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!
```
When strict mode is enabled (`"strict": true` in `tsconfig.json`), you must specify the type:
```ts
// With strict mode enabled, the following is required:
function greet(name: string) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!
```
### Example 2: strictNullChecks
`"strictNullChecks": true,` can be added to `tsconfig.json` to prevent error.
```ts
let username: string = "Alice";
// username = null; // Error when strictNullChecks is enabled

let maybeName: string | null = "Bob";
maybeName = null; // Allowed, since null is explicitly in the type
console.log(maybeName); // Output: null
```
### The Full Strictness Package
When you set `strict: true`, it automatically enables several strict type-checking options at once. It's a convenient way to turn on a suite of best practices for type safety.

**What it enables (key options):**

* `noImplicitAny`: Yes, this is one of the options included in `strict: true`.
* `noImplicitReturns`: Ensures all code paths in a function return a value if it's declared to return one.
* `noFallthroughCasesInSwitch`: Catches switch statements that don't have `break` statements.
* `noUncheckedIndexedAccess`: Makes indexed access (like `arr[0]`) potentially `undefined` if the array is empty.
* `noUnusedLocals`: Flags unused local variables.
* `noUnusedParameters`: Flags unused function parameters.
* `strictNullChecks`: This is a very important one. It strictly checks for `null` and `undefined` values. For example, a `string` type won't automatically include `null` or `undefined`. You'd have to explicitly use `string | null` or `string | undefined`.
* `strictFunctionTypes`: Ensures function parameters are strictly compatible.
* `strictBindCallApply`: Stricter checks for `bind`, `call`, and `apply` methods.
* `alwaysStrict`: Ensures the compiled JavaScript files are emitted with `'use strict';`.

**Why it's useful:** Setting `strict: true` is highly recommended for most new TypeScript projects. It enforces a high level of type safety, catches many common programming errors during development, and leads to more reliable and maintainable code.

::: info Conflict between `strict`, `noImplicitAny`, `strictNullChecks` or any other options. Do I need to use them both? Or can I use one?

You should almost always use `strict: true`.

* If you set `"strict": true`, you **do not need** to explicitly set `"noImplicitAny": true` because `noImplicitAny` is already included as part of `strict`.
* If you set `"noImplicitAny": true` *without* `"strict": true`, you are only enabling that one specific strictness check. You'd be missing out on all the other valuable checks like `strictNullChecks`, `noImplicitReturns`, etc.
:::

**When you might *not* use `strict: true` (and maybe only `noImplicitAny`):**

* **Migrating an existing JavaScript project to TypeScript:** Enabling `strict: true` on a large, untyped JavaScript codebase can result in thousands of errors, making migration very difficult. In such cases, you might enable `noImplicitAny` first, fix those errors, and then gradually enable other strictness flags or eventually `strict: true` once your codebase is more typed.
* **Specific edge cases:** Very rarely, you might encounter a scenario where one of the sub-flags within `strict` causes too much friction for a particular part of your project, and you might temporarily disable `strict` and selectively enable individual strictness flags. However, this is generally discouraged for new code.

## Compiler Options and Module Targets
Compiler options in TypeScript control how your code is compiled and what features are used. Among these options, the **target** and **module** settings are critical because they determine the version of JavaScript output and the module system used.

**Key Points:**
- **Target**: This is one of the most fundamental options. It specifies the ECMAScript version your TypeScript code will be **compiled down to**. Specifies the ECMAScript version for the generated JavaScript (e.g., ES5 for older browsers, ES6, ES207,ES2022 etc. for modern environments). This affects which modern JavaScript features are available.

- **Module**: This is the most important option related to modules. It specifies the **module code generation format** for your compiled JavaScript. Defines the module system to use (e.g., CommonJS for Node.js, ESNext for modern browsers/Node.js, amd, system). This is important for how your modules are loaded and executed.

While they are separate, the choice of target can sometimes influence the available module options (e.g., you can't typically use ES Modules with an ES5 target without further transpilation by a bundler).

Options like moduleResolution, lib, and sourceMap further tailor the compilation process.

### Example: Module Target
Its like language translation for different environment.

**TypeScript Code (Ex: `src/math.ts`)**
```ts
export const add = (a: number, b: number): number => a + b;
```
**Compiled to CommonJS (`target: CommonJs`)**
```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const add = (a, b) => a + b;
exports.add = add;
```
**Compiled to ES Module (`target: ES6`)**
```js
export const add = (a, b) => a + b;
```

### Generate `tsconfig.json` 
Run this command to create a default config:
```sh
tsc --init
```

## CommonJS vs. ESNext Modules: A Detailed Comparison

These are the two dominant module systems in the JavaScript ecosystem, and understanding their differences is crucial for modern development.

| Feature            | CommonJS (CJS)                                   | ES Modules (ESM / ESNext)                                 |
|--------------------|--------------------------------------------------|-----------------------------------------------------------|
| **Primary Usage** | **Server-side (Node.js)** since its early days. | **Browser-side (native)**; modern Node.js, bundlers.      |
| **Syntax** | `require('module')` for import, `module.exports` or `exports.name` for export. | `import { name } from 'module';` or `import defaultExport from 'module';` for import, `export const name;` or `export default ...;` for export. |
| **Loading** | **Synchronous**. Modules are loaded one by one as they are `require`d. | **Asynchronous**. Module graph is analyzed and loaded before execution. |
| **Module Scope** | Each file is a module. Variables are local unless explicitly exported. | Each file is a module. Variables are local unless explicitly exported. |
| **Binding** | **Dynamic**. Exports are copies of values at the time of `require()`. Changes to the original value in the exporting module won't affect the imported copy. | **Live (or "Live Bindings")**. Exports are *references* to the original values. If the value in the exporting module changes, the imported value updates. |
| **`this` context** | `this` inside a CommonJS module refers to `module.exports`. | `this` in an ES Module at the top level is `undefined` (in strict mode, which ESM is always in). |
| **Top-level `await`**| Not supported natively (requires wrapping in `async` function). | Supported natively in modern environments.              |
| **Transpilation** | Generally needs transpilation for use in browsers (e.g., Babel). | Often transpiled down for wider browser support (e.g., `target: es5` with `module: commonjs` or `umd` for older environments). |
| **File Extension** | `.js`, `.cjs` (explicit CommonJS in Node.js).     | `.js`, `.mjs` (explicit ES Module in Node.js).         |
| **Node.js Support**| Default module system (older versions). Node.js can directly run `.js` files as CJS. | Stable since Node.js v13.2.0. Requires `.mjs` extension or `"type": "module"` in `package.json` for `.js` files to be treated as ESM. |