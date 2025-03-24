---
outline: deep
---

# Modules and Dynamic Imports

Modules and dynamic imports are key features in TypeScript that help in organizing, reusing, and optimizing code. They are especially useful in large applications where code splitting and lazy loading improve performance.

Modules in TypeScript are like organizing your tools into separate boxes; they keep your code tidy and reusable, preventing everything from getting mixed up. Dynamic imports are like having a light switch for each room in your house; you only turn on the lights when you need them. This means your app doesn't have to load everything at once, which makes it faster and more efficient. Modules create clean, self-contained code parts, while dynamic imports load those parts only when they're required, ultimately improves performance and keeps your app running smoothly.

::: tip Analogy
Imagine you visit a supermarket:

1. **Static Modules** (Traditional Import) – You enter with a shopping list and pick up everything at once, even if you don’t need some items immediately.
2. **Dynamic Import**(Lazy Loading) – Instead of buying everything at once, you only pick up items as needed when you move to different sections of the store.
3. **Code Splitting** – The store is divided into different sections (fruits, dairy, bakery, etc.), so you don’t have to go through the entire store to find what you need.

Similarly, in programming:

- **Modules** help organize code into **separate files**.
- **Dynamic imports** allow us to load parts of the code **only when required**, improving performance.
  :::

Remember when we talked about [modules](/guide/basics/modules) in the basics, with default and named imports? Well, now we're going to look at dynamic imports and how they work with code splitting.

## Code Splitting with Dynamic Import

Code splitting divides your code into smaller chunks that load **on-demand** (e.g., when a user clicks a button). Dynamic imports (`import()`) enable this by loading modules at runtime instead of importing everything at the beginning. We can dynamically load modules when they are needed.

::: tip Analogy Recap
Imagine a **streaming service** like Netflix. Instead of downloading the entire movie at a time, it loads scenes as you watch them. Similarly, dynamic imports fetch code only when needed, resulting improvement in initial loading time.

- **Static Import**: You download an **entire** movie before watching it.
- **Dynamic Import**: The movie is **streamed** in parts as you watch.

This saves **time and memory** in applications.
:::

### Lazy-Loading a Module

Let's say, I have a math function in my `math.ts` file. I want to import this into my `main.ts` file whenever it is necessary to import. This is Lazy-loading.
::: code-group

```ts [math.ts]
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

```ts [index.ts]
async function calculate() {
  // Load the math module only when needed
  const math = await import("./math");

  console.log(math.add(2, 3)); // Output: 5
  console.log(math.subtract(5, 3)); // Output: 2
}

// Trigger the import on a button click
document.getElementById("calculateBtn")?.addEventListener("click", calculate);
```

:::

#### How It Works

- The `import("./math")` returns a Promise and loads the module **only when needed/only when the button is clicked**.
- We use `await` to wait until the module is loaded before calling `add()` and `subtract()`.
- **Advantage:** The app loads faster because unnecessary code is not included in the initial load.

::: details *Why it is called lazy-loading ?*
The term "**lazy-loading**" comes from the idea of **delaying work until it’s absolutely needed** – like a "lazy" person who avoids doing something until they **have to**.

It affects on:

- **Optimization**: The browser/application avoids "working hard" upfront.
- **Efficiency**: Resources (bandwidth, memory) are used only when truly necessary.

In summary,  
The name "lazy-loading" is a playful metaphor for **delaying work until it’s required**, making applications faster and more efficient. It’s like saying, _"Why load this now? Let’s wait until someone actually needs it!"_
:::

### Conditional Dynamic Imports

We can dynamically import different modules based on conditions. For example in an application _theme-selection_ can be done by this:

```ts
async function loadTheme(theme: "dark" | "light") {
  if (theme === "dark") {
    const darkTheme = await import("./themes/darkTheme");
    darkTheme.applyTheme();
  } else {
    const lightTheme = await import("./themes/lightTheme");
    lightTheme.applyTheme();
  }
}

loadTheme("dark"); // Loads the dark theme dynamically
```

The function **loads only the selected theme**, reducing unnecessary imports.
A **dark mode feature** in a real application **can benefit from this approach**.

## Import Types Only

When you import a module in TypeScript, you might only need its types, not its runtime values. The `import type` syntax allows you to import **type information** (interfaces, types) only, which helps to reduce the final bundle size and avoids unnecessary runtime code.
::: tip Analogy
Think of a **blueprint** for a house. You don’t need the actual bricks and wood to check if the design is correct. You just need the plan. Similarly, `import type` brings only the type definitions, not the runtime code.
:::
**Example**: Regular Import vs. Type-Only Import

```ts
// Regular Import (Includes Runtime Code)
import { User } from "./userModel";
const user: User = { id: 1, name: "Muneem" };

// Type-Only Import (No Runtime Code)
import type { User } from "./userModel";
const user: User = { id: 1, name: "Muneem" };
```

### Importing Types

Suppose you have an interface defined in a module (`interfaces.ts`), and you want to use that interface for type-checking without generating a runtime import.

::: code-group

```ts [interfaces.ts]
export interface User {
  id: number;
  name: string;
}
```

```ts [index.ts]
// Import only the type 'User'
import type { User } from "./interfaces";

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

console.log(greet({ id: 1, name: "Muneem" })); // Output: "Hello, Muneem!"
```

:::
**Key Benefit:**

- The `User` type is **only used for type-checking**
- The compiled JavaScript for `index.ts` **won't include any code** from `interfaces.ts`

### Dynamic Import with Type-Only Imports

Suppose you have a module (`shapes.ts`); from where you exports Type and Function. So you can dynamically import the type and function according to your need.
::: code-group

```ts [shapes.ts]
export type Shape = { name: string };
export function drawShape(shape: Shape) {
  console.log(`Drawing a ${shape.name}`);
}
```

```ts [index.ts]
import type { Shape } from "./shapes";

async function loadAndDrawShape() {
  const { drawShape } = await import("./shapes");
  const shape: Shape = { name: "Circle" };
  drawShape(shape);
}

loadAndDrawShape();
```

:::

#### How It Works

- `import type { Shape }` ensures `Shape` is only used for **type-checking**.
- `await import("./shapes")` loads the function **dynamically when needed**.
- **Advantage**: The script doesn’t load unnecessary code until required.

## At a glance

| Feature/Benefit           | Code Splitting                                                                                                       | Type-Only Imports                                                                                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**               | Optimize loading and performance.                                                                                    | Optimize type usage and prevent circular dependencies.                                                                                                                      |
| **Primary Goal**          | Reduce initial load time, improve performance.                                                                       | Reduce runtime overhead, improve type safety.                                                                                                                               |
| **Key Benefits**          | - Reduces initial loading time. <br> - Loads only necessary code. <br> - Improves performance in large applications. | - Reduces runtime overhead. <br> - Improves performance by avoiding unnecessary imports. <br> - Prevents circular dependencies. <br> - Useful in declaration files (.d.ts). |
| **Impact on Performance** | Improves client-side performance.                                                                                    | Improves build and type-checking performance.                                                                                                                               |
| **Use Case**              | Large applications, lazy loading.                                                                                    | Declaration files, avoiding runtime dependencies.                                                                                                                           |
