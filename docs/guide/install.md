---
outline: deep
---

# Installation

## Setting up TypeScript
Let’s get TypeScript up and running on your machine!

### Installation & Configuration
**1. Install Node.js and npm (if not already installed)**\
Download and install Node.js from **[nodejs.org](https://nodejs.org)**\
Verify installation:
```sh
node -v
npm -v
```
**2. Install TypeScript globally**\
In your terminal, run:
```sh
npm install -g typescript
```
Verify installation:
```sh
tsc -v
```

### Your First TypeScript Program
**1. Create a project folder:**
```sh
mkdir first_project
cd first_project
```
**2. Initialize a new Node.js project(optional):**
```sh
npm init -y
```
**3. Create a TypeScript file:**
In windows.
```sh
echo. > index.ts
```
In mac
```sh
touch index.ts
```
**4. Open the file in the code editor (optional) `index.ts`:**\
If you want to use Visual Studio Code editor, you can open it like this:
```sh title="sh (win/mac)"
code index.ts
```
**5. Write your code in `index.ts`:**
```ts title="TypeScript"
let name: string = "John";
console.log(`Hello ${name} !`); // Hello John !
name = "Doe";
console.log(`Hello ${name} ! (modified)`); // Hello Doe ! (modified)
```
**6. Compile TypeScript to JavaScript:**
```sh
tsc index.ts
```
**7. Run the compiled JavaScript code:**
```sh
node index.js
```

### Configuring TypeScript: (optional)
TypeScript uses a configuration file called `tsconfig.json` to manage project settings.\
Generate it with:
```sh
tsc --init
```
Example `tsconfig.json`:
```json title="json"
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
**Key Configuration Options:**
- `"target"` → Specifies the ECMAScript version (like ES6, ES2020).
- `"module"` → Defines the module system (like CommonJS or ESNext).
- `"outDir"` → The folder where compiled JavaScript files are placed.
- `"strict"` → Enables strict type-checking.
With this setup, you can organize your files like this: 
```sh
/src
  └── index.ts
/dist
  └── index.js
```
Compile everything with: 
```sh
tsc
```
Run the compiled output:
```sh
node dist/index.js
```
or you can use nodemon for continuous integration(if you have installed):
```sh
nodemon dist/index.js
```
### TypeScript Compiler (tsc)
The TypeScript compiler (`tsc`) transforms your TypeScript code into JavaScript. It also checks for type errors and helps you catch mistakes early.  
Basic tsc commands:
- Compile a file:
```sh 
tsc index.ts
```
- Watch for file changes:
```sh 
tsc --watch
```
- Compile with a config file:
```sh 
tsc
```

::: info Note
"TypeScript enhances JavaScript with powerful features like static typing, better tooling, and modern syntax. It might feel like extra work at first, but it saves you from countless headaches in larger projects."
:::

::: tip Analogy
- TypeScript is like a spell checker for writing code.  
- While you can write without it, having it ensures fewer mistakes and better clarity.  
- Imagine JavaScript as writing an essay without spell-check — you might make mistakes, but you won’t know until you hand it in.  
- TypeScript is like writing with a grammar checker that underlines mistakes as you type, so you can fix them before submitting! HOW AMAZING !!  
- The TypeScript compiler is like a translator that converts your carefully written draft (TypeScript) into a language everyone understands (JavaScript). If it spots any grammar or spelling mistakes, it tells you before publishing the final version!
:::