---
sidebar_position: 4
---

# Interfaces and Types
In TypeScript, both `interfaces` and `types` are used to define the shape of objects, but they have some differences in terms of functionality and use cases.  

***keep that in mind**: there are some advanced topics like unions, intersections, utility types: partial, pick, omit, record, return type etc. which is in this lecture. But, don't worry we will discuss them in intermediate and advance sections - **Happy Learning***


## Interfaces
Interfaces are a way to define the structure of an object. They are primarily used to describe the shape of objects, including the properties and methods they should have.  

***Analogy:***  
An interface is like a *restaurant menu standard* that defines what a dish must include, but restaurants can expand on it.

For Example:

- A pizza must have dough, sauce, and cheese (standard).
- A restaurant can extend this by adding extra toppings like pepperoni, mushrooms, or olives.
- The base structure remains the same, but additional details can be added by different chefs.

**Key Features:**  
1. **Extensibility**: Interfaces can be extended or merged.
2. **Object-Oriented:**: They are often used in object-oriented programming to define contracts for classes.
3. **Readability**: Interfaces are more readable when defining object shapes.  

### Example 1: Basic Interface:
```ts title="TypeScript"
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

let student: Person = {
  name: "Alice",
  age: 21,
  isStudent: true
};

console.log(student);  
// Output: { name: 'Alice', age: 21, isStudent: true }
```
### Example 2: Adding Methods to Interface:
```ts title="TypeScript"
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
  }
};

myCar.drive();  
// Output: The Tesla is driving at 120 km/h.
```
Both `Interface` and `Type` can have methods.  

### Example 3: Extending Interfaces:
Interface extension is a Built-in feature. `extends` keyword used to extend interface.
```ts title="TypeScript"
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

console.log(myAudi)

// OUTPUT: { "country": "Germen", "model": "A7 Sedan" } 
```
Both `Interface` and `Type` can be extended using different keyword. (you will see)  

### Example 4: Merging Interfaces: 
Interfaces with the same name are automatically merged.
```ts title="TypeScript"
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

console.log(myCar)

// OUTPUT: { "brand": "Toyota", "model": "Corolla" } 
```
Merging only works with `Interface`
## Types  
Both `type` and `interface` can define an object's structure. But types are more flexible and can define not only object shapes but also unions, intersections, primitives, and more. (we will see these types in Intermediate Typescript)  
N:B: unions/intersections are not supported in interface

***Analogy:***

Think of a type as a *recipe for a dish*. It lists the exact ingredients needed but does not dictate how they must be arranged on the plate or whether they can be modified later.

For Example:

- You have recipes for Pasta, Salad, and Sandwiches that define required ingredients.
- Once the recipe is written, it cannot be changed without creating a new recipe.
- It does not enforce how chefs prepare the dish, only what ingredients must be used.

**Key Features:**  
1. **Flexibility**: Can represent primitive types, unions, intersections, tuples, etc.
2. **Utility Types:**: Can be used with utility types like Partial, Pick, Omit, etc. (will see this in Advanced features)
3. **No Merging**: Types cannot be merged like interfaces. But can be extended using `&` keyword. 

### Example 1: Basic Types
```ts title="TypeScript"
type Bird = {
  name: string;
  canFly: boolean;
};

let parrot: Bird = { name: "Parrot", canFly: true };

console.log(parrot)

// OUTPUT: { "name": "Parrot", "canFly": true } 
```
### Example 2: Adding Methods to Types:
```ts title="TypeScript"
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
neighbour.greet()

// OUTPUT: Hello, my name is Bob
```
### Example 3: Extending Types:
```ts title="TypeScript"
type Car = {
  country: string;
}

type Audi = Car & {
  model: string;
}

const myAudi: Audi = {
  country: "Germen",
  model: "A7 Sedan",
};

console.log(myAudi)

// OUTPUT: { "country": "Germen", "model": "A7 Sedan" } 
```
Both `Type` and `Interface` can be extended. The only difference, `interface` uses `Extends` keyword. Whereas `Type` uses `&` keyword.
### Example 4: Unions and Intersections in Types:
```ts title="TypeScript"
type Cat = {
  name: string;
  meow: boolean;
};

type Dog = {
  name: string;
  bark: boolean;
};

type Pet = Cat | Dog; // Union type

let myPet: Pet = { name: "Whiskers", meow: true }; // ✅ Works
```
Similarly:
```ts title="TypeScript"
type ID = string | number; // Union type
type Coordinates = { x: number } & { y: number }; // Intersection type
```
It also works with Tuples:
```ts title="TypeScript"
type Point = [number, number];
const point: Point = [10, 20];
```
Meanwhile, `Interface` doesn't support unions, intersections or tuples directly.  

## Function Signatures in Type and Interface:
```ts title="TypeScript"
// Function Type
type CalculatePrice = (basePrice: number, tax: number) => number;

const getPrice: CalculatePrice = (basePrice, tax) => basePrice + tax;

// Function Interface
interface PriceCalculator {
  (basePrice: number, tax: number): number;
}

const getPrice: PriceCalculator = (basePrice, tax) => basePrice + tax;
```
Both approaches are valid and achieve the same result. The choice depends on your coding style and project requirements.
### Use Cases (Function Signatures)

- Use **function types** when:
    - You need a quick and concise way to define a function signature.
    - You want to combine function signatures with other types (e.g., unions, intersections).

- Use **function interfaces** when:
    - You want to extend or merge function definitions.
    - You are working in an object-oriented context and want to define contracts for classes or objects.
## Difference Between Interfaces and Types
| Feature                        | Interface | Type |
|--------------------------------|-----------|------|
| Object shape definition        | Yes       | Yes  |
| Adding new properties          | Allowed (merging) | Not allowed |
| Extending                      | Supported using `extends` | Supported using intersection (`&`) |
| Unions and intersections       | Not supported | Supported |
| Functions and methods          | Supported | Supported |
| Readability in large projects  | Easier (automatic merging) | Can become complex with intersections |

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
```ts title="TypeScript"
interface Book {
  readonly title: string;
  author: string;
}

let myBook: Book = { title: "TypeScript Basics", author: "John Doe" };
myBook.author = "Jane Doe"; // ✅ Allowed
// myBook.title = "JavaScript Basics"; ❌ Error: Cannot assign to 'title' because it is a read-only property.
```
***Analogy:** A readonly property is like a birth certificate. Once your name is written on it, you cannot change it.*

### Optional  Properties
Properties marked with `?` are optional, meaning they don’t have to be included.
```ts title="TypeScript"
interface User {
  username: string;
  email?: string; // Optional
}

let user1: User = { username: "muneem_h" }; // ✅ Allowed
let user2: User = { username: "dev_guy", email: "dev@example.com" }; // ✅ Allowed
```
***Analogy:** An optional property is like a middle name. Some people have it, and some don’t, but it’s not required.*

## Short Summary
- Interfaces define object structures and enforce consistency.
- Types are more flexible and allow defining primitives and unions.
- Readonly properties prevent modification after creation.
- Optional properties allow some fields to be skipped.