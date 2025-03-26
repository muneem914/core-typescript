---
outline: deep
---

# Core Types

TypeScript's core types are like labels for your data. They tell the computer what kind of information you're working with, like "text," "numbers," or "true/false." This helps catch mistakes early and makes your code more reliable. Think of them as basic building blocks: `strings` for words, `numbers` for math, `booleans` for yes/no, and so on. TypeScript also lets you create more complex structures like lists (`arrays`) and fixed-length lists (`tuples`). Using these types helps make your code safer and easier to understand.

Let's dive deep into TypeScript core types with detailed analogies, examples, and outputs so you can understand everything in one go!

## Primitive Types

Primitive types are the most basic data types, like the foundation of a building.

### String

A string is used to represent text. It stores sequences of characters, like letters, numbers and symbols which enclosed with single or double quotation marks (depending on the programming language).

```ts
let name: string = "Alice";
console.log(name); // Output: Alice
```

::: tip Analogy
A string is like a label on a jar. You can read and change the text, but it’s always a series of characters. For example, a jar labeled "Sugar" can be relabeled as "Salt."
:::

### Number

A number represents any numerical value, whether an integer or a decimal (floats). Can be positive or negative.  
Example: `age = 15` (integer), `pi = 3.14` (float), `loan = -1000` (negative integer).

```ts
let age: number = 25;
console.log(age); // Output: 25
```

::: tip Analogy
A number is like the speedometer in a car. It shows a numerical value, and you can’t accidentally replace it with words.
:::

### Boolean

A boolean represents "true" or "false" values. It can hold only two values, which represents logical states in programming. It is used for conditions and decision making.

```ts
let isLoggedIn: boolean = true;
console.log(isLoggedIn); // Output: true
```

::: tip Analogy
A boolean is like a door — it’s either open (true) or closed (false). There’s no in-between.
:::

## Arrays, Tuples and Objects

### Arrays

An array is a linear data structure that stores a collection of elements of the same type.

```ts
let fruits: string[] = ["Apple", "Banana", "Mango"];
console.log(fruits); // Output: ["Apple", "Banana", "Mango"]
```

::: tip Analogy
An array is like an fruit carton that holds multiple fruits — they’re all the same type (fruits), just like elements in an array are the same type. No vegetables are allowed in the fruit cartoon.
:::

### Tuples

A tuple is like an array, but with a fixed length and specific types for each position. Tuple is immutable, which means you cannot change any data once created.

```ts
let person: [string, number] = ["Alice", 25];
console.log(person); // Output: ["Alice", 25]
```

::: tip Analogy
A tuple is like a boarding pass. It has a fixed set of fields like passenger name and seat number. You can’t accidentally swap the name with the seat number.
:::

### Objects

An object is a collection of key-value pairs. It is more complex data structure with potentially different data types for each key, which allows structured data representation.

```ts
let person: { name: string; age: number } = { name: "Alice", age: 25 };
console.log(person); // Output: { name: "Alice", age: 25 }
```

::: tip Analogy
An object is like a toolbox — each tool (key) has a specific purpose (value).
:::

### Key differences between `array`, `tuple`, and `object` data types

| Feature                   | Array                                                                  | Tuple                                                   | Object                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Mutability**            | Mutable – elements can be changed after creation.                      | Immutable – elements cannot be modified after creation. | Typically mutable – individual key-value pairs can be modified.                                        |
| **Data Type Homogeneity** | Usually requires all elements to be of the same data type.             | Can store elements of different data types.             | Each key-value pair can have a different data type.                                                    |
| **Access**                | Elements accessed using an index (numerical position).                 | Elements accessed using an index (numerical position).  | Elements accessed using their associated key.                                                          |
| **Use Cases**             | Storing a collection of similar data that might need frequent updates. | Storing a fixed set of data that should not be altered. | Representing complex data with different related attributes, like user information or product details. |

## Enums

Enums let you define a set of named constants. It can make easier to intent a document, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

### Numeric enums

An enum can be defined using the `enum` keyword.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
console.log(move); // Output: 0
```

Above, we have a numeric `enum` where `Up` would have the value `0`. `Down` would have `1` etc. By default, numeric enum indexes starts with 0 and goes-on by auto-incrementing behavior.  
But we can initialize according to our preferences. For example:

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

Above, we have a numeric enums where `Up` is initialized with `1`. All of the following members are auto-incremented from that point on. In other words, `Direction.Up` has the value `1`, `Down` has `2`, `Left` has `3`, `Right` has `4`

### String enums

In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

String enums allow you to give a meaningful and readable value when your code runs, independent of the name of the enum member itself.  
::: tip Analogy
An enum is like traffic signals. You only have a few fixed options (red, yellow, green). You can’t accidentally invent a new signal.
:::

## Special Types

### Any

The `any` type can hold any value. Like anything; it can hold string, number, boolean, even an array. It is relevant to JavaScript variable.

```ts
let anything: any = "Hello";
anything = 42;
console.log(anything); // Output: 42
```

::: tip Analogy
`any` is like a backpack. You can put anything inside, but it might get messy if you’re not careful.
:::

### Unknown

`unknown` is safer than `any`. All you need to do is, you must check the type before using it.

```ts
let notSure: unknown = "Maybe a string?";
if (typeof notSure === "string") {
  console.log(notSure.toUpperCase()); // Output: MAYBE A STRING?
}
```

::: tip Analogy
`unknown` is like a sealed package. You need to open it carefully to see what’s inside before using it.
:::

### Void

`void` represents the absence of a value. Usually in functions that don't return anything.

```ts
function greet(): void {
  console.log("Hello!");
} // Ta-da! You will see nothing.
```

::: tip Analogy
`void` is like shouting into a canyon. You send a message (call the function), but you don’t expect anything back.
:::

### Never

`never` represents values that never happen.

```ts
function throwError(): never {
  throw new Error("Something went wrong!");
}
```

::: tip Analogy
`never` is like a trapdoor. Once you step on it (call the function), you’re gone, and nothing comes back.
:::

## Summary

Understanding TypeScript’s core types makes your code more reliable and easier to maintain. Remember:

- **Primitive Types**: Basic values like text, numbers, and true/false.
- **Arrays and Tuples**: Collections of values.
- **Enums**: Fixed sets of named constants.
- **Special Types**: Flexible or constrained types for advanced scenarios.
