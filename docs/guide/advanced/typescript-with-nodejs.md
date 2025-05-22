---
outline: deep
---

# TypeScript with Node.js
TypeScript is an excellent choice for Node.js backend development. It brings static typing, enhanced tooling, and improved maintainability to server-side applications, which often grow in complexity.

## Setting Up a Node.js Project with TypeScript
Setting up a Node.js project with TypeScript involves a few key steps to configure the environment and compiler.
* **Initialization**: Start by creating a new Node.js project.
    ```sh
    mkdir my-ts-node-app
    cd my-ts-node-app
    npm init -y # Initializes package.json with defaults
    ```
* **Install Dependencies**: You'll need `typescript` itself, and typically `ts-node` for convenient development (running `.ts` files directly without pre-compilation), and `@types/node` for Node.js core type definitions. These are development dependencies.
    ```sh
    npm install --save-dev typescript @types/node ts-node nodemon 
    # nodemon for auto-restarts
    ```
* **TypeScript Configuration (`tsconfig.json`)**: Generate a basic `tsconfig.json` file
    ```sh
    npx tsc --init
    ```
    This command creates a `tsconfig.json` file with many commented-out options. You can learn more from [Configuration](/guide/intermediate/configuration) section.\
    Moreover, your `tsconfig.json` file might look like this:
    ```json
    {
    "compilerOptions": {
        "target": "ES2022",
        "module": "CommonJS", // Node.js uses CommonJS by default
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true
    },
    "include": ["src/**/*"]
    }
    ```
* **Create Source Files**: Create a `src` directory for your TypeScript source code (e.g., `src/index.ts`). Or you can do this from your terminal. Like this: 
    ```sh
    mkdir src
    touch src/index.ts 
    # or
    type null > src/index.ts

    # mkdir src = make directory naming src
    # touch is used for mac
    # type null > for windows
    ```
    Your folder structure will look like this: 

    ```
    my-ts-node-app/
    ├── src/
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
    ```
    In `src/index.ts` add some TypeScript code:
    ```ts
    const name: string = "Muneem";
    const age: number = 24;
        
    console.log(`I'm ${name} and I'm ${age} years old.`)
    ```
* **Compile and Run**: Run TypeScript Directly (Development)
    ```sh
    # Use ts-node to execute without compiling
    npx ts-node src/index.ts
    ```
 
## Using Type Definitions (`@types` packages)
As previously discussed, `.d.ts` files provide type information for JavaScript code. In the Node.js ecosystem, these are predominantly handled by `@types` packages from DefinitelyTyped.

* **Why they're essential in Node.js:** Node.js projects often rely heavily on third-party npm packages. Many of these packages are written in plain JavaScript. To get type-checking and IntelliSense for these JS packages, you need their corresponding type definitions.
* **How to use them:**
    * If you install a JavaScript library (e.g., `express`, `lodash`), you then typically install its type definitions as a development dependency:
        ```bash
        npm install express
        npm install --save-dev @types/express
        # Or for multiple:
        npm install --save-dev @types/lodash @types/jest @types/express
        ```
    * TypeScript automatically looks in the `node_modules/@types` directory for these definitions. You usually don't need to explicitly configure anything in `tsconfig.json` for them to be recognized, unless you've overridden `typeRoots`.


* **Example:**
    ```typescript
    // src/server.ts
    import express from 'express'; // TypeScript knows 'express' types because of @types/express
    import { Request, Response } from 'express'; // Import types directly

    const app = express();
    const port = 3000;

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript Node.js!');
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    // If you used 'lodash' (plain JS):
    // import { isString } from 'lodash'; // Type-checked due to @types/lodash
    // console.log(isString('hello')); // OK
    // console.log(isString(123)); // Type Error!
    ```

## Working with CommonJS and ES Modules in Node.js with TypeScript
Node.js has traditionally used CommonJS, but it now fully supports ES Modules. TypeScript gives you the flexibility to work with either, and even seamlessly bridge between them.

* **Recap:**
    * **CommonJS (CJS):** `require()` and `module.exports`. Synchronous loading. Default for older Node.js.
    * **ES Modules (ESM):** `import` and `export`. Asynchronous loading. Modern standard for browser and Node.js.

* **TypeScript's Role:**
    * You write `import` and `export` statements in your TypeScript code, regardless of your target module system.
    * The `module` option in `tsconfig.json` tells the TypeScript compiler how to *transpile* these `import`/`export` statements into the desired JavaScript module format.

* **Scenario 1: Pure CommonJS Node.js Project**
    * **`tsconfig.json`:** Set `"module": "commonjs"`.
    * **Node.js behavior:** Node.js will automatically interpret `.js` files as CommonJS.
    * **Example (TypeScript, compiled to CJS):**
        * `tsconfig.json`: `"module": "commonjs"`
        * `src/math.ts`:
            ```ts
            export function add(a: number, b: number): number {
              return a + b;
            }
            ```
        * `src/index.ts`:
            ```ts
            import { add } from './math'; // This is TypeScript import syntax
            console.log(add(5, 3));
            ```
        * *After `tsc` compilation to `dist/`:*
            * `dist/math.js`: 
            ```js
            Object.defineProperty(exports, "__esModule", { value: true }); 
            exports.add = add; function add(a, b) { return a + b; }
            ```
            * `dist/index.js`: 
            ```js
            const math_1 = require("./math"); 
            console.log((0, math_1.add)(5, 3));
            ```
        * You'd run `node dist/index.js`.

* **Scenario 2: Pure ES Modules Node.js Project**
    * **`tsconfig.json`:** Set `"module": "esnext"`, `"node16"`, or `"nodenext"`. `nodenext` is generally preferred for Node.js as it correctly infers file extensions and module types.
    * **`package.json`:** Add `"type": "module"` to the top level. This tells Node.js to treat `.js` files in your project as ES Modules by default.
    * **Node.js behavior:** Node.js interprets `.js` files as ES Modules. You must use explicit file extensions in imports (e.g., `import { add } from './math.js';`).
    * **Example (TypeScript, compiled to ESM):**
        * `tsconfig.json`: `"module": "nodenext"`
        * `package.json`: `"type": "module"`
        * `src/math.ts`:
            ```ts
            export function add(a: number, b: number): number {
              return a + b;
            }
            ```
        * `src/index.ts`:
            ```ts
            import { add } from './math.js'; // Note the .js extension! (even though it's .ts)
            console.log(add(5, 3));
            ```
        * *After `tsc` compilation to `dist/`:*
            * `dist/math.js`: 
            ```js
            export function add(a, b) { return a + b; }
            ```
            * `dist/index.js`: 
            ```js
            import { add } from './math.js'; console.log(add(5, 3));
            ```
        * You'd run `node dist/index.js`.

* **Scenario 3: Mixed Module Types (CommonJS Importing ESM, or vice-versa)**
    * This is where `esModuleInterop: true` in `tsconfig.json` becomes very helpful. It adds TypeScript's internal helpers (`__importDefault`, `__importStar`) to your compiled JavaScript to make interoperation smoother.
    * Even with `esModuleInterop`, explicit care is needed when writing dual-package modules or when consuming libraries that are strictly one type.

* **Best Practices for Modules in Node.js with TypeScript:**
    * **For new projects:** Prefer ES Modules (`"module": "nodenext"`, `"type": "module"` in `package.json`) as it's the modern standard and offers benefits like static analysis and top-level `await`.
    * **Explicit extensions:** Even in TypeScript files, use `.js` (or `.mjs`) extensions in your import paths when targeting ESM for Node.js (`import { func } from './my-file.js';`). This might feel odd since your source is `.ts`, but it mirrors how Node.js will resolve the compiled `.js` files.
    * **`esModuleInterop: true`**: Keep this enabled as it simplifies imports from CommonJS modules (which many npm packages still are) into your ES Module TypeScript code.
    * **Consider `ts-node` for dev:** `ts-node` can simplify your development workflow by allowing you to run `.ts` files directly, handling the compilation on the fly. This often means you don't need to worry about the `.js` extensions in your `import` statements *during development* if `ts-node` is configured correctly, but the compiled output for production will still adhere to the `module` target.

See detailed difference between [CommonJS and ESNext module](/guide/intermediate/configuration#commonjs-vs-esnext-modules-a-detailed-comparison)