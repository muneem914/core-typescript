---
outline: deep
---

# Type Annotations
Let’s break down Type Annotations, Explicit vs. Implicit Types, and Type Inference with simple explanations, multiple examples, and relatable analogies!

## What are Type Annotations?
Type annotations are like labels you attach to variables to tell TypeScript what kind of value they should hold.
```ts title="TypeScript"
let age: number = 25;
```
***Analogy:** Type annotations are like name tags at a party. If someone’s tag says "John (Doctor)," you know exactly who they are and what they do.*

## Explicit VS. Implicit Types
### Explicit Types
With explicit types, you *manually* specify the type of a variable.
```ts title="TypeScript"
let username: string = "Alice";
let score: number = 100;
let isOnline: boolean = true;
```
**Output:**
```bash
Alice
100
true
```
***Analogy:** It’s like labeling boxes. One box says "Books," another says "Toys." You know exactly what belongs in each box.*  

**Another Example:**
```ts title="TypeScript"
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 10)); // Output: 15
```
Here, we explicitly say `a` and `b` must be numbers, and the function returns a number.

### Implicit Types
With implicit types, TypeScript guesses the type based on the assigned value.
```ts title="TypeScript"
let message = "Hello, World!";
let count = 42;
```
**Output:**
```bash
Hello, World!
42
```
***Analogy:** It’s like looking inside a box. If you see books inside, you know it’s a book box even if there’s no label.*  

**Another Example:**
```ts title="TypeScript"
let isCompleted = false;
isCompleted = true; // ✔️ Valid
// isCompleted = "Yes"; // ❌ Error: Type 'string' is not assignable to type 'boolean'
```
Since `isCompleted` starts as a boolean, TypeScript won’t let you assign a string later.

## Type Inference
Type inference is when TypeScript automatically figures out the type for you.
```ts
let name = "John";
```
Here, TypeScript infers that `name` is a `string`, so you don’t need to write `: string` explicitly.  
**Example:**
```ts title="TypeScript"
function greet(user: string) {
  return "Hello, " + user;
}
console.log(greet("Alice"));
```
**Output:**
```bash
Hello, Alice
```
***Analogy:** Type inference is like recognizing objects without touching them. If you see someone holding a racket, you infer they’re playing tennis.*
### Complex Inference Example:
```ts title="TypeScript"
let numbers = [1, 2, 3];
numbers.push(4); // ✔️ Valid
// numbers.push("five"); // ❌ Error: 'string' is not assignable to type 'number'
```
TypeScript infers `numbers` as an array of `number`, so adding a string triggers an error.

## Why Use Type Annotations and Inference?
- Annotations give you strict control and make your code self-explanatory.
- Inference makes coding faster and reduces repetition.
A balance of both helps you write clean, safe, and maintainable code.

## Quick Summary

| Concept          | What It Means                                      | Real-World Analogy                                      |
|-----------------|------------------------------------------------|--------------------------------------------------|
| **Type Annotation** | Manually specifying the type of a variable        | Labeling a jar so you know exactly what’s inside |
| **Explicit Types**  | You declare the type explicitly                   | Sorting mail into labeled bins (letters, packages, etc.) |
| **Implicit Types**  | TypeScript guesses the type for you               | Recognizing a fruit without reading the label |
| **Type Inference**  | Automatic detection of types based on assigned values | Knowing someone is a chef by seeing them in a kitchen outfit |
