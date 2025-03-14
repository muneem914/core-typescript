---
outline: deep
---

# Type Assertions

Type Assertion in TypeScript is a way to tell the compiler "**Trust me, I know the type of this value better than you.**"  
It allows us to **override** TypeScript's default type inference and explicitly specify a type.  

**⚠️ Important: Type Assertions do not perform type checking at runtime! They only tell the TypeScript compiler to treat a value as a certain type during compilation.**

***Analogy:***   
Imagine you visit a **doctor** with symptoms. The doctor listens to you and makes a diagnosis.

If the doctor is **unsure**, they might rely on **tests** (TypeScript's type inference).
But if the doctor **knows for sure**, they can **assert** the illness without additional tests.

Type assertions work the same way. When we tell TypeScript exactly what a value should be, it skips extra type checking.

## Syntax of Type Assertions

TypeScript provides two ways to assert a type:  
**1. `as` Syntax (Recommended)**
```ts title="TypeScript"
let value: unknown = "Hello, TypeScript!";
let length: number = (value as string).length; //  Telling TypeScript it's a string
console.log(length); // Output: 18
```
**2. `<Type>` Syntax (Not Recommended in JSX)**
```ts title="TypeScript"
let value: unknown = "Hello, TypeScript!";
let length: number = (<string>value).length; //  Another way to assert a type
console.log(length);
```
**Note: The `<Type>` syntax is not recommended when working with JSX (React), as it conflicts with JSX syntax.**

## Why Use Type Assertions?
- When TypeScript cannot infer the type correctly
- When working with third-party libraries or APIs that return any or unknown
- When converting between similar types

**Example-1: Asserting Type from `unknown`**  

When working with API responses, TypeScript often considers the result as unknown. We can use type assertions to specify the correct type.
```ts title="TypeScript"
function fetchData(): unknown {
  return "Some data from API";
}

let data = fetchData();
let trimmedData = (data as string).trim(); // ✅ TypeScript now treats 'data' as a string
console.log(trimmedData);
```
The API returns unknown, so we tell TypeScript it's a string to safely use .trim().


**Example-2: Accessing Properties on `document.getElementById()`**  

TypeScript assumes that document.getElementById() might return null, so we assert the type.
```ts title="TypeScript"
let inputElement = document.getElementById("user-input") as HTMLInputElement;
inputElement.value = "Hello!"; // ✅ TypeScript now knows it's an input element
```
By default, TypeScript thinks getElementById() might return null.
We assert it as HTMLInputElement, so we can safely use .value.


**Example-3: Asserting a More Specific Type (Narrowing)**  

text
```ts title="TypeScript"
type Animal = { name: string };
type Dog = { name: string; breed: string };

let pet: Animal = { name: "Buddy" };
let dog = pet as Dog; // ✅ Forcing TypeScript to treat 'pet' as 'Dog'

console.log(dog.breed); // ❌ Runtime error (property does not exist)
```
Type assertions do not change the actual data—they just tell TypeScript to treat it differently.
Here, dog is treated as Dog, but breed is still missing.


**Example-4: Converting Between Similar Types**  

TypeScript allows asserting between similar types, such as converting string to number using assertions.
```ts title="TypeScript"
let value: string = "42";
let numericValue = value as unknown as number; // ✅ Double assertion (string → unknown → number)

console.log(numericValue + 10); // ❌ Runtime error if used incorrectly
```
TypeScript does not allow direct assertions between unrelated types (string → number), so we pass through unknown.


## **When Not to Use Type Assertions**  

Avoid Type Assertions When the Type is Uncertain
```ts title="TypeScript"
let userAge: any = "25";
let age: number = userAge as number; // ❌ No actual type conversion!
console.log(age + 5); // ❌ Runtime error (string cannot be used as number)
```
This will cause unexpected behavior because TypeScript does not convert the value—only treats it as a different type.

## Key Takeaways

- A way to tell TypeScript to treat a value as a specific type
- It doesn't change the actual type, it only affects TypeScript's static type checking
- Working with unknown, DOM elements, API responses, and third-party libraries
- Can lead to runtime errors if misused
- Use assertions carefully; avoid overusing them when actual type checking is needed
