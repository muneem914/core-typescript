---
outline: deep
---

# Generics

​Generics in TypeScript provide a way to create reusable components that can work with a variety of data types while maintaining type safety. They allow developers to define functions, classes, and interfaces that can operate with different data types without sacrificing the benefits of static typing.  
::: tip Analogy:
Think of generics as a blueprint for a container that can hold items of any type. For example, a shipping box can contain books, electronics, or clothes. The box's design doesn't change based on its contents; it remains a box. Similarly, generics enable functions and classes to operate on various data types without altering their structure.  

Or you can think generics as customizable molds: the mold (your function, class, or interface) stays the same, but you can pour in different “materials” (types) to create a product that fits your needs.
:::

<!-- Below, we’ll cover:
- Generic Functions
- Generic Classes
- Generic Constraints -->

## Generic Functions

Generic functions let you write a single function that can operate on many types. Instead of repeating code for different types, you define a type variable (often named `T`) that acts as a placeholder for whatever type is used at call time.

**Example without generics**
```ts
function myAge(value: number): number {
  return value;
}
```
This function only works with numbers. But if we want to use the same function for strings, we'd need another version:
```ts
function myName(value: string): string {
  return value;
}
```
So it leads to code duplication. Instead, we can use **Generics**.
### Simple Identity Function  
This classic example returns whatever you pass in.
```ts
function identity<T>(value: T): T {
  return value;
}

// Usage
let num = identity<number>(42);   // Works with numbers
let str = identity<string>("Hello"); // Works with strings
let arr = identity<number[]>([1, 2, 3]); // Works with arrays
```
#### How it works
- `<T>` is a **type parameter** that acts like a placeholder for a type.
- When we call `identity(42)`, TypeScript replaces `T` with `number`, making it `identity<number>(42)`
- This approach eliminates the need to write separate functions for different types.

::: tip Analogy:
Imagine a copier machine that duplicates any document. The copier (the identity function) isn’t built just for letter page or A4 size page. It works on any type of document (or data) you feed it.
:::
### Generics with Arrays
**Example 1: Logging Array Length**  
This function accepts an array of any type, logs its length, and returns it.
```ts
function arrayLength<T>(arr: T[]): T[] {
  console.log("Array length:", arr.length); // will return array length in this
  return arr;
}

const numbers = arrayLength([1, 2, 3]);
// Output: Array length: 3
const strings = arrayLength(["a", "b", "c", "d"]);
// Output: Array length: 4
```
::: tip Analogy:
Think of a versatile tool that measures any collection of items. For example it may be apples or oranges. No matter what is in the container, the tool tells you how many items there are.
:::
**Example 2: Merging Arrays**  
This function accepts more than one array of any type, merges into one array, and returns it.
```ts
function arrayMerger<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}

// Usage with numbers
const numbers = arrayMerger([1, 2], [3, 4]);
// Output: [1, 2, 3, 4]

// Usage with strings
const fruits = arrayMerger(["apple", "banana"], ["mango"]);
// Output: ["apple", "banana", "mango"]
```
#### How it works
- Both `arrayLength` and `arrayMerger` is function which accepts `<T>` - **type parameter**. And accepts arrays as `args`.
- `T[]` represents it will only accept array. Either it's an array of numbers or strings.
- In `arrayLength([1, 2, 3])` we are passing number of arrays and `arr.length` will return the length of the array. 
- Whereas `arrayMerger(["apple", "banana"], ["mango"])` accepting two arrays of strings and `return [...arr1, ...arr2]` will return a combined or merged array of strings using the `(...)` [rest parameters](/guide/basics/functions#rest-parameters).
::: tip Analogy Recap:
Imagine a universal charger that can charge different devices (phones, laptops, tablets). Instead of making different chargers for each device, one charger adapts to different power requirements.

Generics work the same way—they adapt to different types of data without changing the core logic.
:::