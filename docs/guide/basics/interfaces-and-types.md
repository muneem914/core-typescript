---
outline: deep
---

# Interfaces and Types

In TypeScript, both `interfaces` and `types` are tools used to define the shape of objects. Interfaces focus on describing object structures, often used for classes, while types offer more flexibility, handling unions and complex mappings. Both act as contracts, which ensures data consistency across the code. They help TypeScript catch errors early and make your code more readable by clearly outlined to the the expected properties and behaviors of objects. But they have some differences in terms of functionality and use cases.

**\*keep that in mind**: there are some advanced topics like unions, intersections, utility types: partial, pick, omit, record, return type etc. which is in this lecture. But, don't worry we will discuss them in intermediate and advance sections - **Happy Learning\***

## Interfaces

Interfaces are a way to define the structure of an object. They are primarily used to describe the shape of objects, including the properties and methods they should have.

::: tip Analogy
An interface is like a _restaurant menu standard_ that defines what a dish must include, but restaurants can expand on it.

For Example:

- A pizza must have dough, sauce, and cheese (standard).
- A restaurant can extend this by adding extra toppings like pepperoni, mushrooms, or olives.
- The base structure remains the same, but additional details can be added by different chefs.
  :::

**Key Features:**

1. **Extensibility**: Interfaces can be extended or merged.
2. **Object-Oriented:**: They are often used in object-oriented programming to define contracts for classes.
3. **Readability**: Interfaces are more readable when defining object shapes.

### Example 1: Basic Interface

```ts
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

let student: Person = {
  name: "Alice",
  age: 21,
  isStudent: true,
};

console.log(student);
// Output: { name: 'Alice', age: 21, isStudent: true }
```

#### How It Works

- `interface Person { ... }` defines an interface `Person` with `name`, `age`, and `isStudent` properties.
- `let student: Person = { ... }` creates an object `student` of type `Person`.
- The `student` object is initialized with values for all properties defined in the `Person` interface.
- `console.log(student)` prints the `student` object to the console.

This is how every Interfaces works.

### Example 2: Adding Methods to Interface:

```ts
interface Car {
  brand: string;
  speed: number;
  drive(): void;
}

let myCar: Car = {
  brand: "Tesla",
  speed: 120,
  drive() {
    console.log(`The ${this.brand} is driving at ${this.speed} km/h.`);
  },
};

myCar.drive();
// Output: The Tesla is driving at 120 km/h.
```

`myCar` includes a `brand`, `speed`, and a `drive()` method implementation. `myCar.drive()` calls the `drive()` method, which logs the car's brand and speed to the console.  
<Badge type="danger" text="Note" /> Both `Interface` and `Type` can have methods.

### Example 3: Extending Interfaces:

Interface extension is a Built-in feature. `extends` keyword used to extend interface.

```ts
interface Car {
  country: string;
}

interface Audi extends Car {
  model: string;
}

const myAudi: Audi = {
  country: "Germen",
  model: "A7 Sedan",
};

console.log(myAudi);

// OUTPUT: { "country": "Germen", "model": "A7 Sedan" }
```

#### How It Works

- `interface Car { country: string; }` defines an interface `Car` with a `country` property.
- `interface Audi extends Car { model: string; }` defines an interface `Audi` that extends `Car` and adds a `model` property.
- `const myAudi: Audi = { ... }` creates an object `myAudi` of type `Audi`.
- `myAudi` includes both the `country` property (inherited from `Car`) and the `model` property.
- `console.log(myAudi)` prints the `myAudi` object, showing both properties.

<Badge type="danger" text="Note" /> Both `Interface` and `Type` can be extended using different keyword. (you will see)

### Example 4: Merging Interfaces:

Interfaces with the same name are automatically merged.

```ts
interface Car {
  brand: string;
}

interface Car {
  model: string;
}

const myCar: Car = {
  brand: "Toyota",
  model: "Corolla",
};

console.log(myCar);

// OUTPUT: { "brand": "Toyota", "model": "Corolla" }
```

`interface Car { model: string; }` merges another definition of `Car`, adding a `model` property. `const myCar: Car = { ... }` creates an object `myCar` that implements the merged `Car` interface.  
<Badge type="danger" text="Note" /> Merging only works with `Interface`

## Types

Both `type` and `interface` can define an object's structure. But types are more flexible and can define not only object shapes but also unions, intersections, primitives, and more. (we will see these types in Intermediate Typescript)  
<Badge type="warning" text="N.B." /> unions/intersections are not supported in interface

::: tip Analogy

Think of a type as a _recipe for a dish_. It lists the exact ingredients needed but does not dictate how they must be arranged on the plate or whether they can be modified later.

For Example:

- You have recipes for Pasta, Salad, and Sandwiches that define required ingredients.
- Once the recipe is written, it cannot be changed without creating a new recipe.
- It does not enforce how chefs prepare the dish, only what ingredients must be used.

:::
**Key Features:**

1. **Flexibility**: Can represent primitive types, unions, intersections, tuples, etc.
2. **Utility Types:**: Can be used with utility types like Partial, Pick, Omit, etc. (will see this in Advanced features)
3. **No Merging**: Types cannot be merged like interfaces. But can be extended using `&` keyword.

### Example 1: Basic Types

```ts
type Bird = {
  name: string;
  canFly: boolean;
};

let parrot: Bird = { name: "Parrot", canFly: true };

console.log(parrot);

// OUTPUT: { "name": "Parrot", "canFly": true }
```

- `type Bird = { ... }` defines a type `Bird` with `name` and `canFly` properties.
- `let parrot: Bird = { ... }` creates an object `parrot` of type `Bird`.
- `parrot` is initialized with values for the `name` and `canFly` properties.

This is how it works.

### Example 2: Adding Methods to Types:

```ts
type Person = {
  name: string;
  age: number;
  greet(): void;
};

const neighbour: Person = {
  name: "Bob",
  age: 25,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};
neighbour.greet();

// OUTPUT: Hello, my name is Bob
```

- `type Person = { ... }` defines a type `Person` with `name`, `age`, and a `greet()` method.
- `const neighbour: Person = { ... }` creates an object `neighbour` of type `Person` and initialized with values for `name` and `age`, and an implementation for the `greet()` method.

### Example 3: Extending Types:

```ts
type Car = {
  country: string;
};

type Audi = Car & {
  model: string;
};

const myAudi: Audi = {
  country: "Germen",
  model: "A7 Sedan",
};

console.log(myAudi);

// OUTPUT: { "country": "Germen", "model": "A7 Sedan" }
```

- `type Audi = Car & { model: string; }` defines a type `Audi` that is an intersection of `Car` and a type with a `model` property.
- `myAudi` includes both the `country` property (from `Car`) and the `model` property.

<Badge type="danger" text="Note" /> Both `Type` and `Interface` can be extended. The only difference, `interface` uses `Extends` keyword. Whereas `Type` uses `&` keyword.

### Example 4: Unions and Intersections in Types:

```ts
type Cat = {
  name: string;
  meow: boolean;
};

type Dog = {
  name: string;
  bark: boolean;
};

type Pet = Cat | Dog; // Union type

let myPet: Pet = { name: "Whiskers", meow: true }; // Works
```

**Similarly:**

```ts
type ID = string | number; // Union type
type Coordinates = { x: number } & { y: number }; // Intersection type
```

- `type ID = string | number;` defines a union type `ID` that can be either a `string` or a `number`.
- `type Coordinates = { x: number } & { y: number };` defines an intersection type `Coordinates` that combines the properties of both `{ x: number }` and `{ y: number }`.

**It also works with Tuples:**

```ts
type Point = [number, number];
const point: Point = [10, 20];
```

<Badge type="danger" text="Note" /> `Interface` doesn't support unions, intersections or tuples directly.

## Function Signatures in Type and Interface:

```ts
// Function Type
type CalculatePrice = (basePrice: number, tax: number) => number;

const getPrice: CalculatePrice = (basePrice, tax) => basePrice + tax;

// Function Interface
interface PriceCalculator {
  (basePrice: number, tax: number): number;
}

const getPrice: PriceCalculator = (basePrice, tax) => basePrice + tax;
```

Here,

- `type CalculatePrice = (basePrice: number, tax: number) => number;` defines a function type `CalculatePrice` that takes two numbers and returns a number.
- `const getPrice: CalculatePrice = (basePrice, tax) => basePrice + tax;` creates a constant `getPrice` of type `CalculatePrice`, which assigns it a function that calculates the total price.
- `interface PriceCalculator { (basePrice: number, tax: number): number; }` defines an interface `PriceCalculator` that describes a function type with the same signature.
- `const getPrice: PriceCalculator = (basePrice, tax) => basePrice + tax;` creates a constant `getPrice` of type `PriceCalculator`, which assigns it a function that calculates the total price, and demonstrates interface use for function types.
  Both approaches are valid and achieve the same result. The choice depends on your coding style and project requirements.

### Use Cases (Function Signatures)

- Use **function types** when:

  - You need a quick and concise way to define a function signature.
  - You want to combine function signatures with other types (e.g., unions, intersections).

- Use **function interfaces** when:
  - You want to extend or merge function definitions.
  - You are working in an object-oriented context and want to define contracts for classes or objects.

## Difference Between Interfaces and Types

| Feature                       | Interface                  | Type                                  |
| ----------------------------- | -------------------------- | ------------------------------------- |
| Object shape definition       | Yes                        | Yes                                   |
| Adding new properties         | Allowed (merging)          | Not allowed                           |
| Extending                     | Supported using `extends`  | Supported using intersection (`&`)    |
| Unions and intersections      | Not supported              | Supported                             |
| Functions and methods         | Supported                  | Supported                             |
| Readability in large projects | Easier (automatic merging) | Can become complex with intersections |

### When to Use What?

- Use interface:

  - When defining object shapes (especially for class-based OOP).
  - When you might want to extend or merge definitions.
  - For better readability in larger projects.

- Use type:
  - When working with unions or intersections.
  - When you need to define primitive types (like string or number).
  - When you want flexibility without the need for extending later.

## Readonly and Optional Properties

### Readonly Properties

Properties marked as `readonly` cannot be changed after initialization.

```ts
interface Book {
  readonly title: string;
  author: string;
}

let myBook: Book = { title: "TypeScript Basics", author: "John Doe" };
myBook.author = "Jane Doe"; // Allowed
// myBook.title = "JavaScript Basics"; Error: Cannot assign to 'title' because it is a read-only property.
```

::: tip Analogy
A readonly property is like a birth certificate. Once your name is written on it, you cannot change it.
:::

### Optional Properties

Properties marked with `?` are optional, meaning they don’t have to be included.

```ts
interface User {
  username: string;
  email?: string; // Optional
}

let user1: User = { username: "muneem_h" }; // Allowed
let user2: User = { username: "dev_guy", email: "dev@example.com" }; // Allowed
```

::: tip Analogy
An optional property is like a middle name. Some people have it, and some don’t, but it’s not required.
:::

## Short Summary

- Interfaces define object structures and enforce consistency.
- Types are more flexible and allow defining primitives and unions.
- Readonly properties prevent modification after creation.
- Optional properties allow some fields to be skipped.
