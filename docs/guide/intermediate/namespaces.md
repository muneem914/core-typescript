---
outline: deep
---

# Namespaces
Namespaces in TypeScript are like named containers or folders for your code. They help you organize your variables, functions, classes, and interfaces into logical groups. You define a namespace using the `namespace` keyword followed by a name. By default, anything inside a namespace is only visible within that namespace.

**Purpose of using namespace:**\
The primary purpose of namespaces is to **avoid naming collisions** in large JavaScript projects. When you have many different pieces of code from various sources, there's a risk that different variables or functions might accidentally have the same name which can lead to errors. Namespaces create a unique scope, ensuring that names within one namespace don't interfere with names in another.   

They are also used for code **organization**, making it easier to understand and maintain your codebase by grouping related functionalities together. You can think of it as creating logical modules within your application. While ES Modules (`import/export`) are now the standard for modularity in JavaScript, namespaces can still be useful for organizing older codebases or for creating logical groupings within a single compilation unit.

## Internal Modules
Namespaces in TypeScript allow you to organize and encapsulate your code by grouping related variables, functions, classes, and interfaces into a single container. Originally called “internal modules,” namespaces help avoid global namespace pollution by providing a way to create a separate scope within your application.

**Key Features**:
- **Encapsulation**: Keeps your code organized and prevents naming conflicts.
- **Modularity**: Allows splitting code into logical sections that can be maintained independently.

::: tip Analogy
Namespaces are like folders in a filing cabinet. Each folder groups related documents together, preventing them from getting mixed up with files from other subjects. This structure makes it easier to locate, manage, and update your information.
:::
### Example 1: Basic Namespace
```ts
namespace Utilities {
  export function greet(name: string): string {
    return `Hello, ${name}!`;
  }

  export const age = 24;
}

console.log(Utilities.greet("Muneem")); // Output: Hello, Muneem!
console.log(Utilities.age); // Output: 24

// Trying to access age directly would fail:
// console.log(age); // Error: Cannot find name 'age'.
```
The `Utilities` namespace encapsulates the `greet` function. The function is exported, making it accessible outside the namespace via `Utilities.greet`.

### Example 2: Nested Namespaces
```ts
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }
  }

  export namespace Services {
    import User = Models.User;
    export function getUser(): User {
      return { id: 1, name: "Muneem" };
    }
  }
}

const user = App.Services.getUser();
console.log(user); // Output: { id: 1, name: "Muneem" }
```
In this example, the `App` namespace contains two nested namespaces: `Models` (defining an interface) and `Services` (providing a function to return a user). The nested structure keeps related code organized.

**Key Points**:
- Use `namespace` to define the container.
- `export` makes items accessible outside the namespace.
- Access members with `NamespaceName.MemberName`.

## Namespace Merging
Namespace merging is a feature where multiple declarations of the same namespace are combined into a single namespace. This allows you to split the definition of a namespace across multiple files or parts of your code, and TypeScript will merge them into one cohesive unit.

**Key Features**:
- **Separation of Concerns**: You can define related parts of a namespace in different blocks, making large codebases more manageable.
- **Extendability**: Allows adding new members to an existing namespace without modifying its original declaration.

::: tip Analogy
Namespace merging is similar to having different teams contribute to a single project folder. Each team might add its own documents or updates, and when you open the folder, you see all contributions merged into one comprehensive set. This approach allows you to extend and update content without disrupting the overall structure.
:::
### Example 1: Basic Namespace Merging
```ts
// First part of the namespace
namespace Utility {
  export function sum(a: number, b: number): number {
    return a + b;
  }
}

// Second part of the namespace (merged with the first)
namespace Utility {
  export function multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log(Utility.sum(2, 3));      // Output: 5
console.log(Utility.multiply(2, 3)); // Output: 6
```
Both parts of the `Utility` namespace are merged by TypeScript, so both `sum` and `multiply` become available under the same namespace.
### Example 2: Merging Interfaces with Namespaces
```ts
namespace Config {
  export interface Options {
    url: string;
  }
}

namespace Config {
  export interface Options {
    timeout: number;
  }
}

const options: Config.Options = { url: "https://example.com", timeout: 5000 };
console.log(options); // Output: { url: "https://example.com", timeout: 5000 }
```
The two interface declarations for `Config.Options` are merged into a single interface that includes both `url` and `timeout`.

**Key Points**:
- Merged namespaces **share the same name**.
- Members from both parts are combined.

## Summary
| Feature            | Namespaces (Internal Modules)                       | Namespace Merging                                     |
|--------------------|------------------------------------------------------|-------------------------------------------------------|
| **Purpose** | Group related code, avoid global pollution, improve organization. | Combine multiple declarations of the same namespace.      |
| **Usage** | Define with `namespace`, `export` members for external access. | Declare the same namespace multiple times; TypeScript merges. |
| **Benefit** | Prevents naming conflicts, logical code grouping.      | Enables code separation, extension, and modularity.    |
| **Modern Context** | Useful for legacy code, specific bundling scenarios. | Useful for organizing large namespaces across files.   |
| **Alternative** | ES6 Modules (`import`/`export`) for new projects.     | ES6 Modules are the preferred modern alternative for overall modularity. |
| **Analogy** | Folders in a filing cabinet (grouping documents).    | Different teams adding to the same project folder.    |
