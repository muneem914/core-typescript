---
outline: deep
---

# Advanced Types
Let's dive into advanced TypeScript concepts: Union and Intersection Types, Literal Types and Type Aliases, and Type Narrowing and Guards.
## Union and Intersection Types
TypeScript lets you combine or mix types, kind of like mixing ingredients to create new dishes! Let’s break this down.
### Union Types (`|`)
A union type allows a variable to hold values of multiple types. It’s like saying, "This variable can be either type A **or** type B." (each of these types as the *union’s members.*)  

***Analogy:** Think of a vending machine that can dispense both snacks and drinks. The machine can give you either a snack **or** a drink, but not both at the same time.*  
```ts title="TypeScript"
let item: string | number;

item = "Coke"; // Valid
item = 123;    // Valid
// item = true; // Error: Type 'boolean' is not assignable to type 'string | number'.

console.log(item); // Output: 123 (last assigned value)
```
Here, the vertical bar (`|`) is to separate each type, so number | string is the type of a value that can be a number or a string.  

**Another example:**
```ts title="TypeScript"
function serveDrink(drink: "tea" | "coffee") {
  console.log(`Here’s your ${drink}!`);
}

serveDrink("tea");      // Output: Here’s your tea!
serveDrink("coffee");   // Output: Here’s your coffee!
// serveDrink("juice"); // ❌ Error: "juice" is not a valid drink
```

### Intersection Types (`&`)
An intersection type combines multiple types into one. This allows to add together *existing types* to get a *single type* that has all the features from both. It’s like saying, "This variable must satisfy both type A **and** type B." (each of these types as the *union’s members.*)  

***Analogy:** Think of a hybrid car. It’s both an electric car **and** a gasoline car. It must have features of both types.*  
```ts title="TypeScript"
type Electric = { battery: number };
type Gasoline = { fuel: number };

type HybridCar = Electric & Gasoline;

const myCar: HybridCar = {
  battery: 100,
  fuel: 50,
};

console.log(myCar); // Output: { battery: 100, fuel: 50 }
```
Here, `type HybridCar = Electric & Gasoline;` combines `Electric` **and** `Gasoline` car, to form a `Hybrid` one, which contains both properties from electric and gasoline.  

## Literal Types and Type Aliases
### Literal Types
Literal types allow you to specify exact values a variable can hold. It’s like saying, "This variable can only be this specific value."  

***Analogy:** Think of a traffic light. It can only be red, yellow, or green. It cannot be any other color.*  
```ts title="TypeScript"
let trafficLight: "red" | "yellow" | "green";

trafficLight = "red"; // Valid
// trafficLight = "blue"; // Error: Type '"blue"' is not assignable to type '"red" | "yellow" | "green"'.

console.log(trafficLight); // Output: red
```
**Another example:**
```ts title="TypeScript"
type UserStatus = "active" | "inactive"; // Variable can only be "active" or "inactive"

let userStatus: UserStatus = "active";  // Valid

// let userStatus: UserStatus = "reactive";  // inValid
```
### Type Aliases
A type alias in TypeScript allows you to create a custom name for a type. It makes complex types easier to reuse and understand. Like, giving a nickname to a complex type.   
**Key Points**
- Type aliases give a meaningful name to a type.
- They can represent `primitive types`, `objects`, `functions`, and even `unions`.
- They do not create new types, but act as shortcuts for existing ones. 
- They improve readability and reduce duplication. It lets the developer maintain DRY (Don't Repeat Yourself) principle.

***Analogy:** Think of a type alias like a nickname. Instead of repeating a long, complex phrase, you can give it a short and simple name. For example: A person’s full name (e.g., "John Doe"). You can create a nickname (e.g., "Johnny") to refer to them more easily.*  
*Or, Instead of saying "A person who is highly skilled at programming and software development", you can simply say "Software Engineer". Just like this, type aliases works.*  

**For example:**

**Type Alias for an Object**
```ts title="TypeScript"
// Defining a type alias for a user object
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

// Using the alias
const user1: User = {
  name: "Alice",
  age: 25,
  isAdmin: true,
};

const user2: User = {
  name: "Bob",
  age: 30,
  isAdmin: false,
};

```
Instead of writing the object structure `{ name: string; age: number; isAdmin: boolean; }` multiple times, we define it once as `User`.

**Type Alias for a Union Type**
```ts title="TypeScript"
// Defining a type alias for specific string values
type Status = "success" | "error" | "loading";

let apiStatus: Status;

apiStatus = "success";  // ✅ Valid
apiStatus = "loading";  // ✅ Valid
apiStatus = "error";    // ✅ Valid
apiStatus = "failed";   // ❌ Error: "failed" is not part of the Status type
```
Instead of writing `"success" | "error" | "loading"` multiple times, we define it once as `Status`.

**Type Alias for Function Signatures**
```ts title="TypeScript"
// Defining a type alias for a function signature
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

console.log(add(5, 3)); // Output: 8
```
If you have multiple functions following the same signature, you don’t have to rewrite `(a: number, b: number) => number` every time.

#### When to Use Type Aliases?
- Defining complex object types
- Creating union types
- Writing function signatures
- Making code more readable

## Type Narrowing and Guards
### What is Type Narrowing?
Type Narrowing is the process of refining a broader type to a more specific type based on runtime checks. TypeScript automatically "narrows" the type using conditions like `typeof`, `instanceof`, `in`, and user-defined type guards.  
*Its like having a box labeled with "Fruits." You opened it and see it contains only apples. Now you know its a box of apple, not just any fruit.*
### What are Type Guards?
Type Guards are techniques used in TypeScript to ensure that a variable has a specific type before performing operations on it. They are used to safely narrow the types.  

***Analogy:***  

Imagine you work as a security officer at an airport. Your job is to check passengers' IDs and passports to determine if they are:

- A citizen (ID card holder)
- A foreigner (Passport holder)
- A VIP (Special access badge holder)  

Each type of traveler has *different privileges and restrictions.* You "narrow" the traveler type based on their documents before letting them through.

This is exactly how **Type Guards** work in TypeScript. Which checks the "document" (data type) before allowing certain operations.

## Type Narrowing Techniques

### 1. `typeof` Operator - Narrowing Primitive Types
Used to check if a value is a `string`, `number`, `boolean`, or `symbol`.
```ts title="TypeScript"
function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log(`Length of string: ${value.length}`); // Type narrowed to 'string'
  } else {
    console.log(`Value is a number: ${value}`); // Type narrowed to 'number'
  }
}

printLength("Hello"); // Output: Length of string: 5
printLength(42);      // Output: Value is a number: 42
```
Here, `typeof` ensures `value.length` is only accessed when `value` is a string, otherwise it will return a `number`.  
TypeScript automatically narrows, based on `typeof`.

### 2. `instanceof` Operator - Narrowing Object Types
Used to check if an object belongs to a particular class.
```ts title="TypeScript"
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); //  Allowed because TypeScript knows animal is Dog
  } else {
    animal.meow(); //  Allowed because TypeScript knows animal is Cat
  }
}

makeSound(new Dog()); // Output: Woof! 
makeSound(new Cat()); // Output: Meow! 
```
Here, `instanceof` ensures `bark()` is only called on `Dog` and `meow()` is only called on `Cat`.  
TypeScript automatically narrows, based on `typeof`.

### 3. `in` Operator – Checking Properties in an Object
The in operator checks if a property exists in an object.
```ts title="TypeScript"
type Car = { speed: number };
type Boat = { sail: boolean };

function move(vehicle: Car | Boat) {
  if ("speed" in vehicle) {
    console.log(`Moving at speed: ${vehicle.speed} km/h`);
  } else {
    console.log(`Sailing: ${vehicle.sail ? "Yes" : "No"}`);
  }
}

move({ speed: 100 });  // Output: Moving at speed: 100 km/h
move({ sail: true });  // Output: Sailing: Yes
```
Here, `in` ensures `speed` is only accessed when the object is a `Car`, and `sail` is only accessed when the object is a `Boat`.  
TypeScript automatically narrows, based on `typeof`.

### 4. Custom Type Guards – User-Defined Type Checking
A custom type guard is a function that returns `true` or `false` based on type-checking logic.
```ts title="TypeScript"
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function moveAnimal(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim(); // ✅ TypeScript now knows it's a Fish
  } else {
    animal.fly();  // ✅ TypeScript now knows it's a Bird
  }
}

const fish: Fish = { swim: () => console.log("Swimming... ") };
const bird: Bird = { fly: () => console.log("Flying... ") };

moveAnimal(fish);  // Output: Swimming... 
moveAnimal(bird);  // Output: Flying... 
```
Custom type guards are more *flexible* than built-in narrowing methods. It is useful when working with *complex objects.*
