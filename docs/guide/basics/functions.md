---
sidebar_position: 3
---

# Functions  
In programming, a "function" is a block of code that performs a specific task, and within that function, "parameters" are variables that act as placeholders for values you can pass in when calling the function; "optional parameters" allow you to skip providing a value for a parameter if a default value is already set, while "rest parameters" (`...`) enable a function to accept an indefinite number of arguments, collecting them into an array; "return types" specify what kind of data the function will output after execution.   
Let's break down functions in TypeScript step by step, with easy explanations, code examples, outputs, and real-world analogies!
## Function Parameters and Return Types
*Function parameters* are the variables listed within a function definition that receive the values passed when the function is called; they are like placeholders to store data for the function to use. And the specific data that a function will return after is operations are completed, its the *return types*.
```ts title="TypeScript" 
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 10)); // Output: 15
```
***Analogy:** A function is like a vending machine. You input money (parameters), and the machine returns a snack (return value) based on your input.*  

**Another example:**
```ts title="TypeScript" 
function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!
```
***Analogy:** This is like sending a letter. You write a name (parameter), and you get a personalized greeting (return value).*  

## Optional and Default Parameters
Optional parameters are parameters that may or may not be passed to the function, and default parameters have fallback values if no argument is provided. (`?. or ?` used for optional chaining)
```ts title="TypeScript" 
function introduce(name: string, age?: number): string {
  if (age !== undefined) {
    return `My name is ${name}, and I am ${age} years old.`;
  }
  return `My name is ${name}.`;
}
console.log(introduce("Alice")); // Output: My name is Alice.
console.log(introduce("Bob", 30)); // Output: My name is Bob, and I am 30 years old.
```
***Analogy:** It's like filling out a form. Some fields are required (like your name), while others are optional (like your middle name).*  

**With a default parameter:**
```ts title="TypeScript" 
function greetUser(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
console.log(greetUser("Alice")); // Output: Hello, Alice!
console.log(greetUser("Bob", "Good morning")); // Output: Good morning, Bob!
```
***Analogy:** This is like ordering coffee. You can specify exactly what you want or go with the default option.*  

## Rest Parameters
Represented by an ellipsis (`...`) in the function definition. Rest parameters allow a function to accept an indefinite number of arguments or capture any remaining arguments passed to it as an array.
```ts title="TypeScript" 
function sumAll(...numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}
console.log(sumAll(1, 2, 3, 4)); // Output: 10
console.log(sumAll(10, 20)); // Output: 30
```
***Analogy:** It’s like a shopping cart. You can add as many items as you like, and the cashier totals them up.*  

**Another example:**
```ts title="TypeScript" 
function buildSentence(...words: string[]): string {
  return words.join(" ");
}
console.log(buildSentence("I", "love", "TypeScript")); // Output: I love TypeScript
```
***Analogy:** This is like building a sandwich. You add ingredients one by one, and in the end, you have a complete meal.*  

## Summary
- **Function Parameters and Return Types:** Define the types of inputs and outputs to make your functions predictable.
- **Optional and Default Parameters:** Make your functions more flexible by handling missing or default values.
- **Rest Parameters:** Handle multiple arguments easily with a single parameter.
Understanding these function concepts will help you write cleaner, safer, and more efficient TypeScript code!