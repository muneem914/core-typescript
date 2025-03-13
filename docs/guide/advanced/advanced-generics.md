---
outline: deep
---

# Advanced Generics

Generics in TypeScript allow us to write reusable and flexible code. Advanced Generics take this concept further by enabling complex type manipulations, making our code even more powerful and type-safe.

## Variadic Tuple Types

Variadic tuple types allow for the creation of tuples (fixed-length arrays with specific types) that can dynamically change in length. They use the spread operator (...) within tuple type definitions to capture or distribute elements, preserving type information.

Imagine you have a box where you put things in a specific order, like a recipe. That's a tuple. Now, sometimes you don't know exactly how many things will go into that box, but you still want to keep track of what kind of things they are. Variadic tuple types let you do just that. It's like having a box that can hold a flexible number of items, but still remembers what each item is. You can grab parts of the items and rearrange them into a new box, knowing exactly what you're working with.

This is really helpful when you're making instructions (functions) that need to handle different amounts of ingredients (parameters) while keeping each one labeled correctly. Essentially, it adds flexibility to how you define ordered lists of items, allowing for dynamic lengths while maintaining strict type checking.

In a simple term, variadic tuple types allow for the creation of tuples (fixed-length arrays with specific types) that can dynamically change in length. They use the spread operator (`...`) within tuple type definitions to capture or distribute elements, preserving type information.

### Flexible Tuple Creation Example

A function that creates a tuple from any number/type of arguments

```ts
function createTuple<T extends any[]>(...args: T): T {
  return args;
}

const myTuple = createTuple(1, "hello", true);
// Expected Type -> [number, string, boolean]

console.log(myTuple);
// Output: [1, "hello", true]
```

### Combining Tuples Example

Merging two tuples into new tuple

```ts
function mergeTuples<T extends any[], U extends any[]>(
  tuple1: [...T],
  tuple2: [...U]
): [...T, ...U] {
  return [...tuple1, ...tuple2];
}

const combined = mergeTuples([1, "apple"], [true, { name: "Alice" }]);
// Expected Type -> [number, string, boolean, { name: string }]

console.log(combined);
// Output: [1, "apple", true, { name: "Alice" }]
```

#### How it works

In flexible tuple creation:

- `createTuple` uses generics (`<T extends any[]>`) to accept any number of arguments as a tuple.
- `...args: T` collects arguments into an array `args` of type `T`.
- The function returns `args`, effectively creating a tuple.
- `myTuple`'s type is inferred as `[number, string, boolean]` based on the provided arguments.

Meanwhile in combining tuples:

- `mergeTuples` uses generics (`<T>`, `<U>`) to accept two tuples.
- `tuple1: [...T]` and `tuple2: [...U]` define parameters as tuple types.
- `[...T, ...U]` specifies the return type as a merged tuple.
- The function returns a new tuple by spreading elements from `tuple1` and `tuple2`.
- `combined`'s type is inferred as `[number, string, boolean, { name: string }]`.
  ::: tip Analogy
  Imagine a conveyor belt in a factory that assembles boxes. Each box can hold different items (books, toys, tools) in any order, but the conveyor belt tracks the exact sequence and types of items. Variadic tuples work similarly: they preserve the order and types of elements in a tuple.

**Or**,

You can imagine a pizza order system, where a customer can choose different toppings.

- Some customers might want only cheese.
- Others might add pepperoni, mushrooms, and olives.

Each order is different in length but follows a specific structure (a base followed by toppings).

Similarly, Variadic Tuple Types allow us to handle dynamic lists of elements while preserving their structure.
:::

## Generic Inference in Functions

When you give instructions to a computer (write a function), sometimes you need to tell it what kind of things it's working with (types). Generics let you use placeholders for those types.

Now, here's the clever part: often, you don't have to spell out those types every single time. TypeScript is smart enough to figure them out by looking at what you're actually giving it. It's like if you asked someone to "put the things in the box" and they knew exactly what kind of things you meant without you having to say it. This automatic guessing is called generic inference.

It makes writing code much easier and faster, because you don't have to write out every little detail. TypeScript can deduce the type parameters for generic functions by looking at the arguments you pass in, saving you from explicitly stating them.

### Simple Type Inference Example

TypeScript infers `T` and `U` from the arguments

```ts
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair(42, "hello");
// Inferred Type: [number, string]

console.log(result);
// Output: [42, "hello"]
```

#### How it works

- `pair` uses generics (`<T, U>`) to create a tuple of two different types.
- `first: T` and `second: U` define parameters with generic types.
- `[T, U]` specifies the return type as a tuple.
- `result`'s type is inferred as `[number, string]` based on the arguments.

### Inference with Constraints Example

Infer types that have a `name` property

```ts
function getName<T extends { name: string }>(obj: T): string {
  return obj.name;
}

const person = { name: "Alice", age: 30 };
const name = getName(person); // Inferred Type: string

console.log(name);
// Output: "Alice"
```

#### How it works

- `getName` uses a generic constraint (`<T extends { name: string }`) to ensure the input object has a `name` property of type `string`.
- `obj: T` defines the parameter with the constrained generic type.
- The function returns `obj.name`, which is a string.
- `name`'s type is inferred as `string`.

### Inference with Multiple Types Example

```ts
function pairElements<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result1 = pairElements(1, "apple"); // Inferred as [number, string]
const result2 = pairElements(true, [1, 2]); // Inferred as [boolean, number[]]
```

#### How it works

- `pairElements` uses generics (`<A, B>`) to create a tuple of two different types.
- `first: A` and `second: B` define parameters with generic types.
- `[A, B]` specifies the return type as a tuple.
- `result1`'s type is inferred as `[number, string]`.
- `result2`'s type is inferred as `[boolean, number[]]`.

### Inference with Rest Parameters Example

```ts
function callWithTuple<T extends unknown[], R>(
  fn: (...args: T) => R,
  ...args: T
): R {
  return fn(...args);
}

function sum(a: number, b: number, c: number): number {
  return a + b + c;
}

const result = callWithTuple(sum, 1, 2, 3);

console.log(result); // Output: 6
```

#### How it works

- `callWithTuple` uses generics (`<T extends unknown[], R>`) to handle function calls with tuple arguments.
- `fn: (...args: T) => R` defines a function parameter that accepts a tuple `T` and returns type `R`.
- `...args: T` collects arguments of type `T` to be passed to `fn`.
- The function returns the result of calling `fn` with the provided `args`.
- `result`'s type is inferred as `number` based on the return type of `sum`.

::: tip Analogy
Imagine ordering a custom pizza. You tell the pizzeria the toppings you want (the rest parameters), and they “infer” the correct amount and combination without you having to specify the exact measurements for each topping. The function call automatically deduces that the parameters should be numbers and processes them accordingly.
:::

## Summary

| Feature              | Benefits                                                                           |
| -------------------- | ---------------------------------------------------------------------------------- |
| Variadic Tuple Types | Allows handling a dynamic number of arguments while keeping strict type checking.  |
| Generic Inference    | Reduces the need to manually specify types, making code cleaner and easier to use. |
