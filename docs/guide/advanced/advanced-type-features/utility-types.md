---
outline: deep
---

# Utility Types
The utility types help us manipulate and transform types to make them more flexible, reusable, and efficient.  
They are built-in generic types that allow us to modify properties, pick specific fields, omit certain fields, and much more. 

**Utility Type helps in:**
- Reduce code duplication
- Increase type flexibility
- Improve type safety
- Useful for working with dynamic objects and APIs

Below we will look at some of the most commonly used ones.


## Partial 
***Makes All Properties Optional.***  
The `Partial<T>` utility type **makes all properties** in a **type optional**. `Partial<T>` makes all properties of a type `T` optional.  
It’s useful when dealing with incomplete data, such as form updates or optional configuration objects.  

::: tip Analogy
Think of a form where some fields are optional. You can fill in some details now and leave others for later.
:::

**Example:**
```ts {12,14}
type JobApplication = {
  name: string;
  email: string;
  resume: string;
};

// Use Partial to allow saving an incomplete application
function saveDraft(application: Partial<JobApplication>) {
  console.log("Draft saved:", application);
}

saveDraft({ name: "Alice" });  // output 1

saveDraft({ email: "alice@example.com", resume: "resume.pdf" });  // output 2
```
**Output:**
```
// output 1
"Draft saved:",  {
  "name": "Alice"
} 

// output 2
"Draft saved:",  {
  "email": "alice@example.com",
  "resume": "resume.pdf"
} 
```
### Why Use `Partial<T>`
- All properties become optional, allowing partial updates.
- Great for handling drafts, configurations, or form submissions.

## Pick
***Select Specific Properties.***  
The `Pick<T, K>` utility type creates a new type with only the specified properties from an existing type. `Pick<T, K>` creates a new type by picking a set of properties `K` from type `T`.  
It’s useful when we only need a subset of a larger object.

::: tip Analogy
Imagine you have a full set of tools, but you only need a hammer and a screwdriver for a specific task. You pick just those two tools from the set.
:::

**Example:**
```ts
interface User {
    name: string;
    age: number;
    email: string;
    address: string;
}

type UserShortDetails = Pick<User, "name" | "email">;

const userInfo: UserShortDetails = {
    name: "Muneem",
    email: "muneem@example.com"
};

console.log(userInfo);
// Output: { name: 'Muneem', email: 'muneem@example.com' }
```
### Why Use `Pick<T, K>`
- Extracts only necessary fields, reduces complexity.
- Useful when working with large data models but requires only specific properties.

## Omit
***Remove Specific Properties.***  
The `Omit<T, K>` utility type creates a new type by removing specific properties from an existing type. `Omit<T, K>` creates a new type by omitting a set of properties `K` from type `T`.  
::: tip Analogy
Think of a checklist where you decide to skip some items. You omit those items from your list.

or 

Imagine sharing your resume online but removing your phone number and address for privacy.
:::

**Example:**
```ts
type User = {
  name: string;
  email: string;
  phone: number;
  address: string;
};

// Creating a public profile without phone and address
type PublicProfile = Omit<User, "phone" | "address">;

const user: PublicProfile = { name: "Muneem", email: "Muneem@example.com"};
console.log(user);

// Output: 
// { "name": "Muneem", "email": "Muneem@example.com" } 
```
### What if ?
```ts
// CASE-1:
const user1: PublicProfile = { name: "Muneem" }; // [!code error]
console.log(user1);

// CASE-2:
const user2: PublicProfile = { name: "Muneem", email: "Muneem@example.com", phone: "123456789" }; // [!code error]
console.log(user2);
```
In this case, you will get the below output in the log, but there will be type error. Because we omitted "phone" and "address" field while defining `PublicProfile`. It means rest of the fields are necessary while creating `PublicProfile`. Thus, when you are creating `user1` without "email" field, it is throwing error in CASE-1. 
> [!CAUTION]
> Property 'email' is missing in type '{ name: string; }' but required in type 'PublicProfile'.

Similarly, when you are trying to add "phone" field which is omitted while creating `PublicProfile`, you will get an error in CASE-2 like this:

> [!CAUTION]
> Object literal may only specify known properties, and 'phone' does not exist in type 'PublicProfile'.

But it will show you this output anyway.
```
Output for CASE-1:
{ "name": "Muneem"} 

Output for CASE-2:
{ "name": "Muneem", "email": "Muneem@example.com", "phone": "123456789" } 
```

> [!IMPORTANT]
> These errors are similar while using other utility types.


### Why Use `Omit<T, K>`
- Removes sensitive or unnecessary fields when exposing objects.
- Great for privacy concerns or API response modifications.

## Record
***Creates an Object Type with Fixed Keys.***  
The `Record<T, K>` utility type creates an object type where keys (K) are mapped to values of type (T). `Record<T, K>` creates a type with a set of properties `K` from type `T`.  
It’s useful for mapping object structures dynamically.
::: tip Analogy
Imagine a dictionary where each word (key) has a definition (value). The dictionary is a record of words and their definitions.
:::

**Example:**
```ts
type Role = "admin" | "editor" | "viewer";

// Create an object where each role has specific permissions
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

console.log(permissions.admin); // Output: ['read', 'write', 'delete']
```
### Why Use `Record<T, K>`
- Ensures all keys exist and have consistent value types.
- Prevents typos in object keys, as they must match the specified keys (`K`).

## ReturnType
***Extracts the Return Type of a Function.***  
The `ReturnType<T>` utility type extracts the return type of a function type `T`.
::: tip Analogy
Think of a vending machine. You put in money (input) and get a snack (output). The type of snack you get is the return type of the vending machine function.
:::

**Example:**
```ts
function getWeatherForecast() {
  return { temperature: 25, condition: "Sunny" };
}

// Extract the return type of getWeatherForecast function
type Forecast = ReturnType<typeof getWeatherForecast>;

const todayForecast: Forecast = { temperature: 30, condition: "Cloudy" };
console.log(todayForecast);

// Output: 
// { "temperature": 30, "condition": "Cloudy" }
```
**Another Example:**
```ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}

type GreetReturnType = ReturnType<typeof greet>;

const greeting: GreetReturnType = greet("Muneem");

console.log(greeting); // Output: Hello, Muneem!
```
### Why Use `ReturnType<T>`
- Ensures function return types stay consistent across the codebase.
- Avoids manually updating types when function outputs change.

## Required
***Makes All Properties Mandatory.***  
The `Required<T>` utility type makes all properties in a type `T` required.
::: tip Analogy
A bank loan application must be fully filled out before submission.
:::

**Example:**
```ts
type LoanApplication = {
  name?: string;
  income?: number;
};

// Ensure all fields are required
type CompleteApplication = Required<LoanApplication>;

const application: CompleteApplication = { name: "Muneem", income: 50000 };

console.log(application)

// Output:
// { "name": "Muneem", "income": 50000 }
```
<Badge type="info" text="Tricky Part:" /> In `type LoanApplication` optional chaining operator `?` are used in all fields to make them optional, for better understanding of type `Required<T>` which makes each and every fields from type `T` are a must to fill.

### Why Use `Required<T>`
- Ensures critical fields are filled out before using an object.
- Prevents bugs due to missing fields.

## Readonly
***Prevents Modification.***  
The `Readonly<T>` utility type makes all properties in a type immutable". It means that once you've created an object based on a `Readonly<T>` type, you can't change any of its properties.
::: tip Analogy
A legal contract cannot be changed after being signed.
or think of a value that are defined and you cannot change or modify, you can only read the value.
:::

**Example:**
```ts
type Settings = {
  theme: string;
  darkMode: boolean;
};

// Make the settings read-only
const userSettings: Readonly<Settings> = {
  theme: "light",
  darkMode: false,
};

// Error: Cannot assign to 'theme' because it is a read-only property
```

### Why Use `Readonly<T>`
- Prevents accidental modifications to important data.
- Useful when working with constants.

## Why `T` and `K`
- **T for Type:**
    - `T` is almost universally used as a placeholder for a generic type.
    - It's a common convention, especially when referring to the "main" type.
    - Think of `T` as standing for "Type." It's the type you're working with.
- **K for Key:**
    - `K` is a conventional name, specifically used to represent a "Key" type.
    - In utility types like `Record`, `Omit`, and `Pick`, `K` refers to object keys.
    - It clearly indicates a relationship to object keys.

**Is it a convention or could I use anything?**

- **You could use anything:**
    - TypeScript allows any valid identifier as a generic type parameter.
    - Examples: `Type`, `Key`, `MyType`, `MyKey`, `Apple`, `Banana`.
- **But convention matters:**
    - `T` and `K` are strong conventions in the TypeScript community.
    - It makes code:
        - More readable: Developers understand `T` and `K`.
        - More consistent: Aligns with common practices.
        - Easier to maintain: Other developers understand the code.
## Key Takeaways

| Utility Type       | Purpose                                                                    |
|--------------------|----------------------------------------------------------------------------|
| `Partial<T>`       | Makes all properties optional.                                            |
| `Pick<T, K>`        | Selects specific properties.                                              |
| `Omit<T, K>`        | Removes specific properties.                                               |
| `Record<K, T>`      | Creates an object with predefined keys and value types.                         |
| `ReturnType<T>`    | Extracts the return type of a function.                                    |
| `Required<T>`      | Makes all properties required.                                             |
| `Readonly<T>`      | Makes all properties immutable.                                            |


- **Utility types** help manage complex data structures easily.
- They **increase type safety** and **reduce redundancy**.
- They are **essential for scalable, maintainable TypeScript projects**.
