---
outline: deep
---


# Method Overloading

Method overloading lets a class have **multiple methods with the same name** but different parameter types/numbers. TypeScript resolves which method to call based on the inputs.

Method overloading allows you to define multiple method signatures for the same method name but with different parameter types or counts. In TypeScript, you achieve overloading by:

- Declaring multiple method signatures (without implementations).
- Providing one implementation that handles all the declared signatures.

This approach allows for the creation of more adaptable interfaces, where functions can gracefully handle diverse inputs while maintaining strict type safety. By clearly documenting the different ways a method can be invoked, method overloading simplifies the API, making it more intuitive and user-friendly for developers.

<Badge type="danger" text="Note:" /> Unlike some other languages, TypeScript performs overloading at compile time only. At runtime, only a single method exists, so you must write logic within the implementation to differentiate between cases.

::: tip Analogy
Imagine a restaurant where you can order a meal in several ways:

- You might say, “I’d like a burger” (default order).

- Or, “I’d like a burger with extra cheese” (order with an extra parameter).

- Or, “I’d like a burger and a side of fries” (order with multiple items).

The waiter (the overloaded method) understands your request based on the details you provide. Even though the command is the same ("order meal"), the specifics differ. The kitchen (method implementation) uses conditional logic to prepare the right meal.
:::

## Overloading a Function in a Class (Basic Overloading)

Its an example of basic overloading. In this we will create a class with a method that can handle different types of inputs.

```ts
class Printer {
  // Overload signatures
  print(message: string): void;
  print(message: number): void;

  // Single implementation
  print(message: string | number): void {
    if (typeof message === "string") {
      console.log(`String: ${message}`);
    } else {
      console.log(`Number: ${message}`);
    }
  }
}

const printer = new Printer();
printer.print("Hello"); // Output: String: Hello
printer.print(123); // Output: Number: 123
```

**Another Example of Basic Method Overloading**

```ts
class Calculator {
  // Overloaded method signatures
  add(a: number, b: number): number;
  add(a: string, b: string): string;

  // Single implementation for both signatures
  add(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    // Optionally, throw an error if types don't match.
    throw new Error("Invalid arguments");
  }
}

// Usage:
const calc = new Calculator();
console.log(calc.add(5, 10)); // Output: 15 (number addition)
console.log(calc.add("Hello, ", "World!")); // Output: "Hello, World!" (string concatenation)
```

### How It Works

- Both the `Printer` and `Calculator` classes demonstrates method overloading for the `print` and `add` method.
- Both the overloaded `print` methods for string and number inputs.
- A single implementation handles both types using a union type (`number | string`).
- `typeof` checks input types and performs addition or concatenation.
- An error is thrown if the input types are incompatible.
- This is how method overloading allows us to define multiple function signatures with different parameter types. Which provides type safety and improves code readability. A single implementation handles all overloaded signatures.

## Overloading with More Complex Parameters

Suppose we have a class that formats messages differently based on whether additional formatting options are provided.

```ts
class MessageFormatter {
  // Overload signatures:
  format(message: string): string;
  format(message: string, uppercase: boolean): string;
  format(message: string, uppercase: boolean, prefix: string): string;

  // Implementation covering all overloads:
  format(message: string, uppercase?: boolean, prefix?: string): string {
    let formatted = message;

    if (uppercase) {
      formatted = formatted.toUpperCase();
    }

    if (prefix) {
      formatted = `${prefix}: ${formatted}`;
    }

    return formatted;
  }
}

// Usage:
const formatter = new MessageFormatter();
console.log(formatter.format("hello")); // Output: "hello"
console.log(formatter.format("hello", true)); // Output: "HELLO"
console.log(formatter.format("hello", true, "Greeting")); // Output: "Greeting: HELLO"
```

### How It Works

- The `MessageFormatter` class utilizes method overloading to provide multiple ways to format a message.
- It defines three `format` signatures, allowing the function to be called with different combinations of parameters.
- The single implementation of `format` uses optional parameters (`uppercase?: boolean`, `prefix?: string`) to accommodate all the overloaded signatures.
- Inside the implementation, conditional statements (`if`) are used to check if the optional parameters are provided.
- If `uppercase` is true, the message is converted to uppercase.
- If `prefix` is provided, it's added to the beginning of the formatted message.
- The usage examples demonstrate calling the `format` method with different argument combinations, showing how the overloaded signatures and optional parameters work together.

## Overloading with Union Types and Advanced Logic

Imagine a scenario in a logging system where the logger behaves differently depending on the type of input (e.g., a single message string, an error object, or a combination of both).

```ts {32,35,38}
interface LogError {
  message: string;
  code: number;
}

class Logger {
  // Overload signatures:
  log(message: string): void;
  log(error: LogError): void;
  log(message: string, error: LogError): void;

  // Unified implementation:
  log(messageOrError: string | LogError, maybeError?: LogError): void {
    if (typeof messageOrError === "string" && maybeError) {
      // When both a message and an error are provided
      console.log(`Message: ${messageOrError}`);
      console.error(`Error: ${maybeError.message} (Code: ${maybeError.code})`);
    } else if (typeof messageOrError === "string") {
      // When only a message is provided
      console.log(`Message: ${messageOrError}`);
    } else {
      // When only an error object is provided
      console.error(
        `Error: ${messageOrError.message} (Code: ${messageOrError.code})`
      );
    }
  }
}

// Usage:
const logger = new Logger();

// Logging a message
logger.log("System started successfully.");

// Logging an error
logger.log({ message: "System failure", code: 500 });

// Logging both a message and an error
logger.log("System encountered an error", {
  message: "Database unreachable",
  code: 503,
});
```

**Output**

```
"Message: System started successfully."

"Error: System failure (Code: 500)"

"Message: System encountered an error"
"Error: Database unreachable (Code: 503)"
```

### How It Works

- The `Logger` class uses method overloading to provide flexibility in logging different types of information. It defines three `log` signatures: for logging a simple message, an error object, or both a message and an error.
- A single implementation of `log` handles all the overloaded signatures using a union type (`string | LogError`) for the first parameter and an optional `LogError` for the second.
- Inside the implementation, `typeof` is used to determine the type of the `messageOrError` parameter. Conditional logic then handles each case: logging a message, logging an error, or logging both.
- When an error object (`LogError`) is provided, its `message` and `code` properties are extracted and logged to the console using `console.error`.
- The usage examples demonstrate calling the `log` method with different argument combinations, showing the flexibility provided by method overloading.

::: warning <u>Analogy Recap for Method Overloading</u>
Let's say you have a "**send message**" function. You want it to handle sending messages in a few different ways:

- Send a message to one person (by name).
- Send a message to a group (by group name).
- Send a message with an attachment.

Method overloading lets you define one "**send message**" function, but tell it how to handle each of those situations. You write the actual code for sending a message once, but you tell the computer, "If you give me a name, do this. If you give me a group name, do that. If you give me a name and an attachment, do this other thing."

**So, you have one function, but it adapts to different types of "_send message_" requests. It's like having one button that does different things depending on what information you give it.**
:::

## Key Takeaways

| Aspect                | Details                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------- |
| Purpose               | To define multiple ways to call the same method with different parameter types or counts.     |
| Method Signatures     | Declared overload signatures provide type safety at compile time.                             |
| Single Implementation | Only one method implementation exists; it must handle all cases using conditional logic.      |
| Use Cases             | Useful in scenarios where similar operations have variations, e.g., formatting, logging, etc. |


> [!NOTE]
> If you are facing issues in understanding classes then you can visit [Basic Classes](/guide/basics/classes) first.