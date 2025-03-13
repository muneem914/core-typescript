---
outline: deep
---


# Generic Classes
Generic classes offer a powerful way to create flexible and reusable code in object-oriented programming. They achieve this by introducing type parameters, which acts as placeholders for actual data types, allows a single class definition to operate on various types without requiring separate implementations.  
When an instance of a generic class is created, the specific data type is provided, it ensures type safety at compile time and prevents potential runtime errors.  

This approach minimizes code duplication, enhances readability, and provides greater flexibility, similar to having a versatile container that can hold any type of object. Ultimately, generic classes promote efficient and maintainable code by allowing developers to write type-safe, adaptable structures that can handle a wide range of data types.

::: tip Analogy: 
Think of a **bookshelf** that can hold books of any genre (mystery, sci-fi, romance). The shelf doesn’t care what type of book it holds, but once you specify a genre, it ensures only books of that genre are added.
:::
**Example Without Generics**
```ts
class NumberBox {
  content: number;
  constructor(value: number) {
    this.content = value;
  }
}

let numberBox = new NumberBox(100); // Works for numbers, but not for strings
```
If we need a similar class for `string`, we'd have to duplicate it:
```ts
class StringBox {
  content: string;
  constructor(value: string) {
    this.content = value;
  }
}

let stringBox = new StringBox("Hello"); // Works for strings, but not for numbers
```
This isn't efficient. **Generics** solve this problem.
## Simple Generic Class Example
```ts
class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

let numberBox = new Box<number>(100); // Box with number
let stringBox = new Box<string>("Hello"); // Box with string
let booleanBox = new Box<boolean>(true); // Box with boolean
```
### How it works
- `<T>` makes the class flexible to work with any type.
- The class adapts dynamically to the type passed during object/instance creation.

::: tip Analogy Recap:
Think of a storage container that can hold different things—books, clothes, or toys. The container remains the same; only the contents change.

Similarly, a Generic Class can hold different types of data without changing its structure.
:::

## Generic Stack Example
It's a data structure blueprint. It defines how a "stack" works (last-in, first-out) without specifying what it holds. Its purpose is to create a reusable structure that can operate on any data type. The "generic" part means the specific data type is provided later, when you actually use the stack. It avoids writing multiple stack implementations for each data type.
```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop());  // Output: 20
console.log(numberStack.peek()); // Output: 10

const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log(stringStack.pop());  // Output: "second"
console.log(stringStack.peek()); // Output: "first"
```
### How it works
Implements a stack data structure that can hold elements of any type.
- `<T>`: Defines a type parameter, allowing the stack to work with any data type.
- `push(item: T)`: Adds an item to the top of the stack.
- `pop(): T | undefined`: Removes and returns the top item, or `undefined` if empty.
- `peek(): T | undefined`: Returns the top item without removing it, or `undefined` if empty.
- Demonstrates usage with number and string stacks.
::: tip Analogy: 
Think of a container that can stack any type of object, for example: books, plates, or toys. The container (your stack class) remains the same, but you decide what to stack by specifying the type. Even you are able to remove or add any object into your container.
:::
::: info Keys to remember:
In TypeScript (and JavaScript), "push," "pop," and "peek" are common operations performed on arrays, though "peek" is not a built-in array method.
- `push()` adds one or more elements to the *end* of an array. It modifies the original array. Returns the new length of the array.
- `pop()` removes the *last* element from an array. It also modifies the original array. Returns the *removed* element. If the array is empty, it return `undefined`
- `peek()` retrieves the *last* element of an array without removing it. It does *not* modify the original array. Typescript arrays don't have built-in `peek()` method. You need to implement it yourself. As like in the previous example: 
`return this.items[this.items.length - 1];`
:::
## Generic Key-Value Pair Example
It's a blueprint for a data structure that holds two related pieces of information: a "key" and a "value." Its purpose is to create a flexible structure where both the "key" and the "value" can be of any data type. It allows for the creation of adaptable data structures that can hold diverse types of related information.
```ts
class Pair<T, U> {
  constructor(public key: T, public value: U) {}
}

// Pair of number and string
const idToName = new Pair<number, string>(1, "Alice");
// Output: { key: 1, value: "Alice" }

// Pair of string and boolean
const settings = new Pair<string, boolean>("darkMode", true);
// Output: { key: "darkMode", value: true }
```
### How it works
Creates a simple class to hold a pair of values with different types.
- `<T, U>`: Defines two type parameters, allowing for different key and value types.
- `constructor(public key: T, public value: U)`: Initializes the pair with a key and a value.
- Shows examples with number, string and string, boolean pairs.
::: tip Analogy: 
Think of a container where you put something in, and you give it a label. The label tells you what's inside. A "generic key-value pair" is like that, but you can choose what kind of label and what kind of thing goes inside. It's great for storing information where you need to look things up by a specific label, and you don't know ahead of time what kinds of labels or things you'll have.
:::
## Generic Repository Example
It's a blueprint for a data access layer. It defines how to interact with data storage without specifying the exact type of data being stored or the source of the data. Its purpose is to create a consistent interface for data operations across different data models and sources. It promotes code reusability and maintainability by abstracting data access logic. It centralizes data operation.  
This example shows a repository that can store and retrieve objects with a required property (`id`).
```ts
interface HasId {
  id: number;
}

class Repository<T extends HasId> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}

interface User extends HasId {
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Alice" });
userRepo.add({ id: 2, name: "Bob" });
console.log(userRepo.findById(2)); // Output: { id: 2, name: "Bob" }
```
### How it works 
Implements a repository pattern for managing entities with an `id` property.  
- `interface HasId`: Defines a contract for entities that have an `id`.
- `Repository<T extends HasId>`: Creates a generic repository that works with any type that extends `HasId`.
- `add(item: T)`: Adds an entity to the repository.
- `findById(id: number): T | undefined`: Finds an entity by its `id`.
- `interface User extends HasId`: Creates a specific entity type that extends `HasId`.
- Demonstrates how to create a `userRepo` that operates on `User` objects.
::: tip Analogy: 
Think of a filing cabinet (repository) that only accepts files with a specific label (an `id`). Even though the files might differ (users, products, etc.), the cabinet ensures they all have that key property (an `id`).
:::

