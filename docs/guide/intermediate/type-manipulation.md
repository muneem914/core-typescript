---
outline: deep
---

# Type Manipulation

Type manipulation in TypeScript gives you advanced tools to shape your data's blueprints even before your program runs. Instead of just defining basic data types, you can create new types based on existing ones, change their structure, and even make choices about types depending on certain rules. It's like having a way to write instructions that tell TypeScript how to understand and work with your data in very specific and flexible ways. This helps you build more reliable and adaptable code, especially when dealing with complicated information.

## keyof Operator
The `keyof` operator is used to extract the keys of a given type as a union of string (or number) literal types. It’s a way to list the property names of an object type.
### Explanation
- When you apply `keyof` to a type, you get a union type that contains all the keys of that type.
- It is very useful when you want to restrict inputs to only the keys of an object.
::: tip Analogy
Think of `keyof` as creating a table of contents for an object. \
If you have a book (object) with chapters (properties), the `keyof` operator gives you a list of all the chapter titles. You can then refer only to those valid chapter titles when needed.
:::
#### Example 1: Basic Usage**
```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type PersonKeys = keyof Person;
// PersonKeys is equivalent to: "name" | "age" | "location"

const key1: PersonKeys = "name";      // It's Valid

console.log(key1); // Output: "name"
```
**What if** I try to access like this:
```ts
const key2: PersonKeys = "email";   
// Error: Type '"email"' is not assignable to type 'keyof Person'.
```
**How it works**
- `interface Person { ... }` defines an interface `Person` with `name`, `age`, and `location` properties.
- `type PersonKeys = keyof Person;` uses the `keyof` operator to create a [type alias](/guide/intermediate/advanced-types#type-aliases), which is `PersonKeys`.
- `PersonKeys` becomes a union type of all the property names of the `Person` interface.
- `const key1: PersonKeys = "name";` declares a constant `key1` of type `PersonKeys` and assigns it the string literal `"name"`, which is a valid key of the `Person` interface.
- `const key2: PersonKeys = "email";` would cause a type error because `"email"` is not one of the keys defined in the `Person` interface.

#### Example 2: Dynamic Access**
```ts
const car = {
  brand: "Toyota",
  year: 2020
};

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const carMake = getProperty(car, "brand");
console.log(carMake); // Output: "Toyota"
```
**How it works**
- `T` is the type of the object (`car` in this case).
- `K extends keyof T` means the key must be one of the keys of that object (`"brand"` or `"year"`).
- `T[K]` is the type of the value for that key.
- `getProperty(car, "brand")` safely returns `"Toyota"` (a string), and TypeScript knows it must be a string.

This function helps you get a value from an object while keeping full type safety. It won’t let you request a key that doesn’t exist in the object.

## Mapped Types
Mapped types allow you to transform existing types by iterating over their keys and applying a transformation to each property. They are powerful tools for creating modified versions of types, such as making all properties optional, read-only, or even transforming their types.\
In simple term, mapped types create **new types by transforming existing ones**, often by iterating over keys.\
Think of it as a "_loop over properties_" for types.
### Explanation
- A mapped type uses the syntax `[K in keyof T]: ...` to create a new type by looping over the keys of an existing type.
- You can modify each property’s modifier (like optional or readonly) or even change its type.
::: tip Analogy
Like a **factory conveyor belt** that takes raw materials (original type) and stamps them into new products (new type). For example, making all car parts optional or read-only.\
Or you can imagine like you have a printed form. A mapped type is like taking that form and making every field either optional (you don’t have to fill in all the fields) or making them read-only (you can view but not change the information). It’s the process of reformatting or repurposing a template.
:::
#### Example 1: Making All Properties Optional**
```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type PartialPerson = {
  [K in keyof Person]?: Person[K]
};

const partial: PartialPerson = { name: "Alice" }; // Valid even if age and location are missing
console.log(partial); // Output: { name: "Alice" }
```

#### Example 2: Making All Properties Readonly**
```ts
type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K]
};

const readonlyPerson: ReadonlyPerson = { name: "Bob", age: 25, location: "Paris" };
// readonlyPerson.age = 26; // Error: Cannot assign to 'age' because it is a read-only property
console.log(readonlyPerson); // Output: { name: "Bob", age: 25, location: "Paris" }

```
**How it works**
- `interface Person { ... }` defines an interface `Person` with `name`, `age`, and `location` properties.
- `type PartialPerson = { [K in keyof Person]?: Person[K] };` uses a mapped type to create `PartialPerson`.
    - `[K in keyof Person]?`: This iterates over each key `K` in `Person` and makes the corresponding property optional using the `?` modifier.
    - `Person[K]`: This specifies that the type of the optional property should be the same as the type of that property in the `Person` interface.
- `const partial: PartialPerson = { name: "Alice" };` creates an object `partial` of type `PartialPerson`. It's valid even though `age` and `location` are missing because they are optional.
- `console.log(partial);` prints the `partial` object, which contains only the `name` property.
- `type ReadonlyPerson = { readonly [K in keyof Person]: Person[K] };` uses a mapped type to create `ReadonlyPerson`.
    - `readonly [K in keyof Person]`: This iterates over each key `K` in `Person` and makes the corresponding property read-only using the `readonly` modifier.
    - `Person[K]`: This specifies that the type of the read-only property should be the same as the type of that property in the `Person` interface.
- `const readonlyPerson: ReadonlyPerson = { ... };` creates an object `readonlyPerson` of type `ReadonlyPerson` with all the required properties.
- `// readonlyPerson.age = 26;` is a commented-out line that would cause a type error because the `age` property in `readonlyPerson` is read-only.
- `console.log(readonlyPerson);` prints the `readonlyPerson` object with all its properties.


## Conditional Types
Conditional types let you express types that depend on a condition. They work similarly to an "if-else" statement but at the type level.
### Explanation
- A conditional type takes the form `T extends U ? X : Y`
- It evaluates the condition and returns one type if the condition is true, and another if false.
::: tip Analogy
Conditional types are like a decision-making process at a restaurant. Depending on what you order (e.g., vegetarian or non-vegetarian), the kitchen prepares a different dish. The type returned depends on a condition, just as your meal depends on your choice.\

Or,  you can imagine of a **traffic light**
- If the light is green, you go.
- If red, you stop.

Similarly, conditional types decide the output type based on input conditions.
:::
#### Example 1: Basic Conditional Type**
```ts
type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<"Hello">; // "Yes"
type Test2 = IsString<10>; // "No"
```
**How it works**
**`type IsString<T> = T extends string ? true : false;`**

- **Imagine a simple question:** "Is this thing a string?"
- **`type IsString<T>`:** We're creating a new type named `IsString`. The `<T>` means this type can work with different kinds of "things" (types).
- **`T extends string`:** This is the "is it a string?" part. It checks if the "thing" (`T`) is a `string`.
- **`? true : false`:** This is the answer part.
    - If `T` *is* a `string`, the answer (the type `IsString<T>`) will be `true`.
    - If `T` is *not* a `string`, the answer will be `false`.

**So:**

- `type Test1 = IsString<"Hello">;`  We're asking, "Is 'hello' a string?" The answer is `true`, so `Test1` becomes the type `true`.
- `type Test2 = IsString<"10">;` We're asking, "Is the number 42 a string?" The answer is `false`, so `Test2` becomes the type `false`.

**Think of it like a mini type-level function that gives you a boolean (true or false) based on the type you give it.**

#### Example 2: Conditional Type in extracting array element**
```ts
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type Numbers = ExtractArrayType<number[]>; // number
type NotArray = ExtractArrayType<string>;  // never
```
**How it works**
**`type ExtractArrayType<T> = T extends (infer U)[] ? U : never;`**

- **Imagine you have a box, and sometimes it's a box *of something else*.** This type helps you figure out *what's inside* if it's a box (an array).
- **`type ExtractArrayType<T>`:** We're making a new type named `ExtractArrayType` that works with different kinds of "things" (`T`).
- **`T extends (infer U)[]`:** This is the "is it a box of something?" part.
    * `(infer U)[]` is a special way of saying "if `T` is an array, then let's *infer* (figure out) the type of the items *inside* the array and call that type `U`."
- **`? U : never`:** This is what we get back:
    - If `T` *is* an array, we get `U` – the type of the elements inside.
    - If `T` is *not* an array, we get `never`. `never` is a special TypeScript type that means "this should never happen" or "this type has no possible values."

**So:**

- `type Numbers = ExtractArrayType<number[]>;` We're asking, "What's inside the `number[]` box?" TypeScript infers that the inside is `number`, so `Numbers` becomes the type `number`.
- `type NotArray = ExtractArrayType<string>;` We're asking, "What's inside the `string` box?" `string` is not an array, so we get `never`.

**Think of it like a tool that opens an array box. If it's an array, it tells you what kind of stuff is inside. If it's not an array, it says "nothing to see here."**
::: danger NOTE
TypeScript types like `IsString` and `ExtractArrayType` only exist at compile time. At runtime, TypeScript types are erased, so we use variables and type assertions to reflect their inferred types.
:::
#### Example 3: Conditional Type in Function Return Types**
```ts
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User {
  role: "user";
  preferences: string[];
}

// Conditional type based on role
type Person<T> = T extends { role: "admin" } ? Admin : User;

// Function returning the correct type based on input
function getPerson<T extends Admin | User>(person: T): Person<T> {
  return person as Person<T>;
}

// Example usage
const admin = getPerson({ role: "admin", permissions: ["manage-users"] });
console.log(admin); // { "role": "admin", "permissions": [ "manage-users" ] }

const user = getPerson({ role: "user", preferences: ["dark mode"] });
console.log(user); // { "role": "user", "preferences": [ "dark mode" ] }

```
**How it works**
- `Admin` and `User` are interfaces with fixed `role` values and specific fields (`permissions` or `preferences`).
- `Person<T>` is a conditional type: if `T` has `role: "admin"`, it becomes `Admin`; otherwise, `User`.
- `getPerson` is a generic function that returns the correct type (`Admin` or `User`) based on the input's `role`.
- TypeScript uses the `Person<T>` conditional type to infer the return type automatically.
- This allows type-safe handling of different shapes (`admin` vs `user`) based on input at compile-time.

## Template Literal Types
Template literal types allow you to create new string literal types by combining or manipulating existing string literals. They work similarly to JavaScript template literals but at the type level.
### Explanation
- You can use template literal types to concatenate or transform literal types.
- This is particularly useful for creating more specific types, such as generating event names or constructing API endpoints.
::: tip Analogy
Template literal types are like customizable labels. Imagine you’re making custom name tags. You have a fixed format (e.g., "Employee: [Name]") and you fill in the name. Similarly, template literal types let you create new types based on a fixed format with variable parts.
:::
#### Example 1: Basic Template Literal Type**
```ts
type Direction = "left" | "right";
type Movement = `go ${Direction}`;

const move: Movement = "go left"; // Valid

console.log(move); // Output: "go left"
```
**What if** I write this:
```ts
const move2: Movement = "move left"; 
// Error: Type '"move left"' is not assignable to type '"go left" | "go right"'.
```
**How it works**
- `type Direction = "left" | "right";`: Union type allowing "left" or "right".
- `type Movement`: Template literal type combining "go " with `Direction`.
- `Movement` can be "go left" or "go right".
- `const move: Movement = "go left";`: Valid assignment.
- `const move2: Movement = "move left";`: Invalid – doesn't match the expected pattern.

#### Example 2: Combining Literal Types**
```ts
type Color = "red" | "green" | "blue";
type ColorMessage = `The color is ${Color}`;

const message: ColorMessage = "The color is green"; // Valid

console.log(message); // Output: "The color is green"
```
**What if** I write this:
```ts
const message2: ColorMessage = "Color is green"; 
// Error: Type '"Color is green"' is not assignable to type '"The color is red" | "The color is green" | "The color is blue"'. Did you mean '"The color is green"'?
```
**How it works**
- `type Color = "red" | "green" | "blue";`: Union type for colors.
- `type ColorMessage`: Template literal using `Color`.
- `ColorMessage` can be "The color is red", "The color is green", or "The color is blue".
- `const message: ColorMessage = "The color is green";`: Valid assignment.
- `const message2: ColorMessage = "Color is green"; `: Invalid assignment. As the `ColorMessage` context is different from `message2`

## Summary
- **keyof Operator**: Extracts the keys of an object type as a union of literal types, similar to creating a table of contents for an object.
- **Mapped Types**: Create new types by transforming each property of an existing type, much like reformatting a template to make fields optional or read-only.
- **Conditional Types**: Allow you to choose between types based on a condition, working like an if-else decision process at the type level.
- **Template Literal Types**: Generate new string literal types by combining or modifying existing ones, similar to constructing customizable labels.

These powerful type manipulation techniques enable will you to write more flexible, safe, and expressive TypeScript code, which will allow you to model complex type relationships and constraints in a clear and maintainable way.


<!-- ================================ -->

<!-- ### Explanation

::: tip Analogy

:::
#### Example 1: **
```ts

```
**How it works**

#### Example 2: **
```ts

```
**How it works**
 -->
