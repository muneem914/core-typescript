---
outline: deep
---


# Generic Constraints
Generics offer flexibility, letting code work with various types. However, sometimes you need rules. Generic constraints are those rules. They limit the types a generic can accept, ensuring they have the properties or methods you need. Think of it as saying, "This function works with any type, as long as it has a 'length' property," or "This class only works with types that follow this specific interface." This keeps your code safe and predictable, preventing errors by ensuring only compatible types are used.
::: tip Analogy
Think of a vending machine that sells drinks. Generics are like the machine's ability to accept various types of drink orders. Generic constraints are the rules the machine follows. It might have a rule like, "Only accepts orders for drinks that fit in the dispensing slot," or "Only accepts orders for drinks that are in our inventory." These rules ensure the machine doesn't jam or try to dispense something it doesn't have. The vending machine is flexible, but it has limitations to guarantee it functions correctly.
:::
**Problem Without Constraints**
```ts
function printLength<T>(item: T): void {
  console.log(item.length); // Error: Not all types have 'length'
}

printLength(42); // Error! Number doesn't have 'length'
```
`number` does not have a `.length` property, so the code fails.
But we can fix this using **Generic Constraints**.  

Below some examples of *generic constraints* are discussed.

## Constraint with `length` Property
This constraint ensures that a generic function or type can only be used with data types that possess a `length` property. This is particularly useful when you need to perform operations that rely on the concept of "length," such as determining the size of a string, array, or other iterable object.
```ts
function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}

logLength("hello"); // Output: 5
logLength([1, 2, 3]); // Output: 3
// logLength(42); // Error: number has no 'length'
```
### How it works
- `function logLength<T extends { length: number }>(arg: T): void`:
    - Defines a generic function `logLength` with type `T`.
    - `T extends { length: number }`: Ensures `T` has a `length` property (number).
    - `console.log(arg.length);`: Logs the `length`.
- `logLength("hello");`: String has `length`.
- `logLength([1, 2, 3]);`: Array has `length`.
- `logLength(42);`: Number lacks `length` (error).
::: tip Analogy
Imagine you have a machine that prints labels. This machine has a constraint: it can only print labels on things that have a "surface area" (like a `length` property). You can print labels on boxes, envelopes, or rolls of tape because they all have a surface area. But you cannot print a label on a cloud or a sound, because they don't. The machine's constraint ensures it only works with compatible items.
:::

## Constraint with Interface
This constraint ensures that a generic function or type can only be used with objects that implement a specific interface. Interfaces define a contract, specifying the properties and methods that an object must have. This constraint is crucial for ensuring that objects passed to a function have the required structure.
```ts
interface HasId {
  id: number;
}

function printId<T extends HasId>(item: T): void {
  console.log(`ID: ${item.id}`);
}

printId({ id: 1, name: "Alice" }); // Output: ID: 1
// printId({ name: "Bob" }); // Error: Missing 'id'
```
### How it works
- `interface HasId { id: number; }`: Defines interface `HasId` with `id: number`.
- `function printId<T extends HasId>(item: T): void`:
    - Generic function `printId` with type `T`.
    - `T extends HasId`: Ensures `T` implements `HasId`.
- `printId({ id: 1, name: "Alice" });`: Object implements `HasId`.
- `printId({ name: "Bob" });`: Object lacks `id` (error).
::: tip Analogy
Think of a library system. The library has a rule: only books that have a barcode (like an `id` property) can be checked out. The interface `HasId` is like the requirement for a barcode. The librarian (the `printId` function) can only work with books that follow this rule.
:::

## Constraint with Property Access
This constraint ensures that a generic function can only access properties that exist on a given object. It uses the keyof operator to obtain the keys of an object's type and then constrains the key parameter to be one of those keys. This prevents accessing non-existent properties, enhancing type safety.
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", age: 30 };
console.log(getProperty(user, "name")); // Output: "Alice"
// console.log(getProperty(user, "address")); // Error: "address" is not a key of user
```
### How it works
- `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`:
    - Generic function `getProperty` with types `T`, `K`.
    - `K extends keyof T`: Ensures `K` is a key of `T`.
    - `T[K]`: Returns the value of `obj[key]`.
- `const user = { id: 1, name: "Alice", age: 30 };`: Defines `user` object.
- `console.log(getProperty(user, "name"));`: "name" is a key of `user`.
- `console.log(getProperty(user, "address"));`: "address" is not a key of `user` (error).
::: tip Analogy
Imagine you have a filing cabinet with labeled folders. Generics are like being able to ask for any folder from the cabinet. Generic constraints are like the rule that you can only ask for folders that actually exist. If you ask for a folder labeled "Customer Records," and that folder exists, you'll get it. But if you ask for a folder labeled "Invisible Unicorns," which doesn't exist, you'll get an error (or nothing). The constraint prevents you from asking for folders that aren't there.
:::

