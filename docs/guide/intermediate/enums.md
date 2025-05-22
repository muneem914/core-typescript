---
outline: deep
---

# Enums

In TypeScript, an enum (short for _enumeration_) is a feature that allows developers to define a set of named constants. Essentially, it provides a way to give more user-friendly and descriptive names to a set of numeric or string values.
::: details What is named constants? {open}
In programming, a named constant is a storage location in memory that holds a value that cannot be changed during the program's execution after it's initially assigned. Essentially, it's a variable whose value is fixed and intended to represent a permanent data value. 
:::
The core idea behind enums is to improve the readability and maintainability of code. Instead of using magic numbers or hardcoded strings throughout the application, you can define a specific enum with meaningful names for those values. TypeScript provides both numeric and string-based enums. By default, numeric enums assign sequential, zero-based numbers to their members. However, you can also explicitly assign numeric or string values to enum members.\
[Basics on enums](/guide/basics/core-types#enums)
::: tip Note
Enums contribute to type safety by restricting the values a variable can hold to the set of values defined within the enum. This helps prevent logical errors and makes the code more self-documenting. TypeScript also generates both forward and reverse mappings for numeric enums, allowing you to access the name of a constant given its value, and vice versa. String enums, on the other hand, only provide a forward mapping (name to value).
:::


# Constant vs. Computed Enums
TypeScript enums allow you to define a set of named constants. They come in two primary forms:
1. Constant Enums
2. Computed Enums

## Constant Enums
Constant enum is a type that holds a predefined set of named constants, which are values that cannot be changed during runtime. They are fully resolved at compile time. Their values are inlined in the generated JavaScript, which can improve performance and reduce code size.
**Characteristics**:
- Their values are computed at compile time.
- They cannot use computed expressions.
- When using constant enums, the enum values are replaced by their literal values during compilation.
::: tip Analogy
Constant enums are like a printed price list in a store. The prices are fixed and printed on the list so that when you look them up, you get the exact value immediately, with no additional calculation required.
:::
#### Example 1: Constant Enum
```ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

console.log(Direction.Up);    // Output: 0
console.log(Direction.Left);  // Output: 2
```
The compiler replaces `Direction.Up` with `0` and `Direction.Left` with `2` directly in the generated code. Or you can say they are replacing their index numbers by default.

#### Example 2: Constant Enum with Custom Values
```ts
enum Status {
  Success = 1,
  Failure = 0,
  Pending = -1
}

console.log(Status.Success); // Output: 1
console.log(Status.Pending); // Output: -1

```
The enum members are assigned fixed numeric values which are inlined.
## Computed Enums
Computed enums allow members to have values that are calculated at runtime (or at compile time with expressions) rather than being simple constants. They can include expressions and function calls (if they can be resolved at compile time) to determine their value.\
The value of an enum member can be either a constant or computed.

**Characteristics**:
- Their values can be computed using expressions.
- They are useful when the enum value needs to depend on other values or require some calculation.
::: tip Analogy
Computed enums are like a dynamic menu where some items’ prices might be calculated based on current market conditions or custom combinations. The final price is not fixed until the calculation is performed, unlike a static price list.
:::
#### Example 1: Computed Enum Member
```ts
enum FileAccess {
  // Constant member
  None,
  // Computed member
  Read = 1 << 1, // 2 (1 shifted left by 1)
  Write = 1 << 2, // 4 (1 shifted left by 2)
  ReadWrite = Read | Write // 6 (bitwise OR)
}

console.log(FileAccess.None);      // Output: 0
console.log(FileAccess.Read);      // Output: 2
console.log(FileAccess.Write);     // Output: 4
console.log(FileAccess.ReadWrite); // Output: 6
```
`Read` and `Write` are computed using bitwise shift operators, and `ReadWrite` is computed by combining the two values.

#### Example 2: Mixed Enum
```ts
enum Mixed {
  A,             // 0 (constant)
  B = "B_Value", // string literal (computed as a literal string)
  C = A + 10     // Computed based on constant A, results in 10
}

console.log(Mixed.A); // Output: 0
console.log(Mixed.B); // Output: "B_Value"
console.log(Mixed.C); // Output: 10
```
`Mixed.B` is a computed string literal, and `Mixed.C` is computed from another constant enum member.

## Reverse Mapping
Reverse mapping in TypeScript refers to the ability of numeric enums to map from the numeric value back to its corresponding name. This is automatically generated for numeric enums.\
Numeric enums automatically create a reverse mapping from values to keys. String enums do not support this. Like a phone directory where you can look up a name by number (reverse lookup), not just a number by name.

**Characteristics**:
- When you create a numeric enum, TypeScript generates an object that includes both forward mappings (name to value) and reverse mappings (value to name).
- Reverse mapping does not work for string enums because the mapping is not bidirectional with strings.
::: tip Analogy
Reverse mapping is similar to having a two-way directory. For numeric enums, it's like having a contact list where you can look up someone's name by their employee ID (and vice versa). With string enums, since the values are not unique numbers but literal strings, you only have a one-way lookup, like a list where names do not have corresponding numbers to look up backwards.
:::
#### Example 1: Reverse Mapping in Numeric Enums
```ts
enum Direction {
  North = 1,
  East,  // 2 (auto-incremented)
  South, // 3
  West,  // 4
}

// Forward lookup (key → value)
console.log(Direction.North); // Output: 1

// Reverse lookup (value → key)
console.log(Direction[1]); // Output: "North"
console.log(Direction[3]); // Output: "South"
```
Both forward / reverse lookup works fine.
#### Example 2: Reverse Mapping Limitation with String Enums
```ts
enum Color {
  Red = "RED",
  Blue = "BLUE",
  Green = "GREEN"
}

console.log(Color.Red);       // Output: "RED"
// Reverse mapping does not work for string enums
console.log(Color["RED"]);  // Error: Property 'RED' does not exist on type 'typeof Color' (undefined)
```
While `Color.Red` correctly outputs `"RED"`, there is no reverse mapping available for string enums.\
**Have a look in another example*
```ts
enum DirectionString {
  North = "NORTH",
  East = "EAST",
}

console.log(DirectionString.North); // Output: "NORTH"
console.log(DirectionString["NORTH"]); // Error: No reverse mapping! (undefined)
//Property 'NORTH' does not exist on type 'typeof DirectionString'. Did you mean 'North'? bla bla ! 
```
## Summary

| Feature          | Constant Enums                      | Computed Enums                         | Reverse Mapping                       |
|------------------|--------------------------------------|----------------------------------------|---------------------------------------|
| **Definition** | Members inlined as literals at compile time. | Members calculated using expressions at runtime. | Automatic mapping from numeric values back to enum names. |
| **Members** | Fixed values known at compile time.  | Values determined during program execution. | Applies to the numeric values of enum members. |
| **Usage** | Best for static, unchanging values.  | Useful for dynamic values or bitwise flags. | Enables lookup of enum name from its numeric value. |
| **JavaScript Output** | No runtime object generated; values inlined. | Generates JavaScript object with computed values. | Generated automatically for numeric enums. |
| **Reverse Lookup** | Not supported.                     | May be limited or unreliable.          | Supported for numeric enums.          |
| **String Enums** | Can be constant if all members have literal values. | Can have computed members with string values. | Not automatically supported.        |
| **Analogy** | Printed price list (fixed).        | Dynamic menu with changing prices.     | Two-way directory (ID <-> Name).      |
