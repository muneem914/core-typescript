---
outline: deep
---

# Introduction
This documentation provides a thorough understanding of **TypeScript** for developers of all levels, from beginners to advanced users. The goal is to explain each concept with code examples and relatable real-life analogies to make learning intuitive and engaging.
Let's discover in depth.

## What is TypeScript?
TypeScript is a superset of JavaScript that adds static typing and other features to enhance code quality and developer productivity. It compiles to plain **JavaScript**, which runs in any browser or Node.js environment.

## Why Use TypeScript?
- **Error Detection**: Catches errors during development (instant-while writing on IDEs).
- **Enhanced Tooling**: Offers autocompletion, type checking, and documentation (like ours).
- **Scalability**: Ideal for large projects.

### Benefits over JavaScript

1. **Fewer Bugs**: TypeScript catches common errors (like types or incorrect data types) during development.
```ts title="Typescript"
let age: number = 25;
age = "twenty-five"; // Error: Type 'string' is not assignable to type 'number'
```
Meanwhile in JavaScript: 
```js title="JavaScript"
let age = 25;
age = "twenty-five"; // No issues. 'string' can be assignable to type 'number'
console.log(age); // twenty-five
```
2. **Better Code Readability**: Explicit types make your code self-documenting and easier to understand.
3. **Improved Productivity**: With features like autocompletion, inline hints, and refactoring tools, you write code faster and more confidently.
4. **Easier Collaboration**: Static types make it easier for teams to work on large codebases, as everyone knows what types to expect.
5. **Modern JavaScript Features**: TypeScript supports the latest JavaScript features and adds its own, like interfaces, decorators, and more.
6. **Scalability**: TypeScript makes it easier to manage large and complex projects, thanks to its strong typing system and better tooling support.

### JavaScript VS TypeSCript

**Key Differences Between TypeScript and JavaScript**

| **Feature**              | **JavaScript**                                                              | **TypeScript**                                                         |
|--------------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **Typing**               | Dynamic typing (types checked at runtime)                                    | Static typing (types checked at compile time)                           |
| **Error Checking**       | Errors only show up during execution                                         | Errors caught during development                                        |
| **IDE Support**          | Basic code suggestions                                                      | Advanced autocompletion, inline documentation, and type inference      |
| **Compilation**          | Directly runs in browsers                                                    | Needs to be compiled into JavaScript using the TypeScript compiler (`tsc`) |
| **New Features**         | Limited to what browsers support                                             | Supports future JavaScript features + TypeScript-only features         |
| **Interfaces & Types**   | Not supported natively                                                       | Fully supports interfaces, custom types, and more                      |
| **Learning Curve**       | Easier for beginners                                                        | Slightly steeper learning curve, but more predictable code             |
