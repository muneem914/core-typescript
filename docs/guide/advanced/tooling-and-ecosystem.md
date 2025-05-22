---
outline: deep
---

# Tooling and Ecosystem
TypeScript doesn't just provide powerful type-checking; it comes with a rich ecosystem of tools and best practices that significantly enhance the development experience, especially when working with popular frameworks.

TypeScript enhances JavaScript by adding static typing, which helps catch errors early and improves code maintainability. Integrating TypeScript with popular frameworks like React, Angular, and Vue provides robust tooling and better developer experience.

## React with TypeScript
To create a new React project with TypeScript:
```sh
npx create-react-app my-app --template typescript
```
React components are often written using JSX, which becomes TSX (`.tsx` files) in TypeScript. You define component props and state using TypeScript interfaces or types.

**For Example:**
::: code-group

```tsx [MyComponent.tsx]
import React from 'react';

// Define the shape of your component's props
interface MyComponentProps {
  message: string;
  count?: number; // Optional prop
}

const MyComponent: React.FC<MyComponentProps> = ({ message, count = 0 }) => {
  return (
    <div>
      <h1>{message}</h1>
      <p>Current count: {count}</p>
    </div>
  );
};

export default MyComponent;
```

```tsx [App.tsx]
import MyComponent from './MyComponent';
function App() {
  return <MyComponent message="Hello TypeScript!" count={5} />;
}
export default App;
```

:::
**Best Practices:** Use `React.FC` (or just define types for props directly), embrace hooks with type safety (`useState<Type>()`), and use type inference where appropriate.

## Angular with TypeScript
Angular is built with TypeScript at its core, providing a comprehensive framework for building applications. It heavily uses decorators (`@Component`, `@Injectable`, `@NgModule`, etc.) to define the structure and behavior of your application.\
Angular with TypeScript is like a well-structured organization where every role (component, service, etc.) has a clear contract, ensuring smooth collaboration.
::: code-group
```ts [hero.component.ts]
import { Component, Input } from '@angular/core';

interface Hero {
  id: number;
  name: string;
  powers: string[];
}

@Component({
  selector: 'app-hero',
  template: `
    <h2>{{ hero.name }}</h2>
    <p>Powers: {{ hero.powers.join(', ') }}</p>
  `,
  standalone: true // In newer Angular versions
})
export class HeroComponent {
  @Input() hero!: Hero; // Declare input with a type
}

// Usage in another component's template:
// <app-hero [hero]="myAwesomeHero"></app-hero>
```
:::
**Best Practices:** Leverage Angular's strong typing for inputs/outputs, services, and reactive forms. Use interfaces for data models and classes for services.
## Vue with TypeScript
Vue 3, in particular, has excellent TypeScript support, especially with the [Composition API](https://dev.to/jacobandrewsky/understanding-the-vue-3-composition-api-fa2#:~:text=The%20Composition%20API%20is%20a,data%20%2C%20methods%20%2C%20and%20computed%20.) (`<script setup>`). You can define props, reactive state, and events with explicit types.\

In a Vue Single File Component (SFC):
::: code-group
```vue [MyGreeting.vue]
<!-- using <script setup> for Vue 3 -->
<script setup lang="ts">
// Define props with types
interface Props {
  name: string;
  age?: number; // Optional prop
}
const props = defineProps<Props>();

// Define reactive state with types
import { ref } from 'vue';
const message = ref<string>('Hello, Vue 3 with TS!');
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Greeting {{ props.name }}!</p>
    <p v-if="props.age">You are {{ props.age }} years old.</p>
  </div>
</template>
```
:::
**Best Practices:** Use `<script setup lang="ts">` for concise component definition, define props and emits using interfaces, and leverage `ref<Type>()` or `reactive<Type>()` for state.

## Type Declaration Files (`*.d.ts`)
Type declaration files are the **bridge** between JavaScript and TypeScript. They contain only type information (interfaces, types, functions signatures, variable declarations) but **no executable code**.

**Purpose:**
* **Providing types for JavaScript libraries:** When you use a plain JavaScript library (like jQuery or an older utility library) in a TypeScript project, TypeScript needs to know what types of arguments its functions expect and what types they return. `.d.ts` files provide this "type blueprint" without including the actual JavaScript implementation.
* **Allowing TypeScript libraries to be consumed by other TypeScript projects:** When you compile a TypeScript library, you typically generate `.js` files (the executable code) and `.d.ts` files. The `.d.ts` files allow other TypeScript projects to use your library with full type-checking and IntelliSense, even though they are only consuming the compiled JavaScript.

**For Example:**
::: code-group
```ts [myLib.d.ts]
declare module "my-javascript-library" {
  export function greet(name: string): string;
}
```
```ts [app.ts]
import { greet } from "my-javascript-library";
console.log(greet("Alice")); // Type-safe!
```
:::
You can install a package named `lodash`. Know more about [lodash](https://www.geeksforgeeks.org/lodash/)
```sh
npm install @types/lodash # For Lodash types
```
**Example with simplified `lodash.d.ts`**
```ts
// node_modules/@types/lodash/index.d.ts (simplified)
declare module 'lodash' {
  /**
   * Creates a duplicate-free version of an array.
   * @param array The array to inspect.
   * @returns Returns the new duplicate free array.
   */
  function uniq<T>(array: T[]): T[];

  /**
   * Creates an array with all falsey values removed.
   * @param array The array to inspect.
   * @returns Returns the new filtered array.
   */
  function compact<T>(array: (T | null | undefined | false | '' | 0)[]): T[];

  // ... many more declarations
}
```
When you `import { uniq } from 'lodash';` in your TypeScript code, TypeScript looks for this `.d.ts` file to understand `uniq`'s signature, even though `lodash` itself is plain JavaScript.

**Creating your own `.d.ts` files:**

* **Manual:** You can write them by hand for small, internal JS libraries. You'd use keywords like `declare module`, `declare function`, `declare const`, `declare class`, etc.
* **Automatic:** If you set `"declaration": true` in your `tsconfig.json`, the TypeScript compiler will automatically generate `.d.ts` files for your own TypeScript code when it compiles.

## Contributing to DefinitelyTyped
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) is a **massive, community-run repository** on GitHub that hosts the vast majority of `.d.ts` files for popular (and not-so-popular) JavaScript libraries that don't ship with their own type definitions.

* **Purpose:** It ensures that the TypeScript community has access to type information for virtually any JavaScript package, making it possible to use untyped JS libraries with TypeScript's benefits.
* **How it works:**
    1.  **Fork** the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository on GitHub.
    2.  **Clone** your fork locally.
        ```sh
        git clone https://github.com/DefinitelyTyped/DefinitelyTyped.git
        cd DefinitelyTyped
        ```
    3.  **Create a new branch** 
        ```sh
        git checkout -b add-types-for-my-lib
        ```
    4.  **Create a new directory** for the library you want to add/update types for (e.g., `types/my-js-library`).
    5.  **Add Type Definitions**: Create a folder for your library and add `index.d.ts` with type definitions
    6.  **Run tests**: Use `tsc` to ensure your types are correct
    7.  **Submit a Pull Request (PR)** to the main `DefinitelyTyped` repository. Community maintainers will review your contribution.
* **Impact:** Once merged, your `.d.ts` file is automatically published to npm under the `@types/` scope (e.g., `@types/jquery`). Other developers can then simply run `npm install @types/my-js-library` to get the types.

## Linters and Formatters for TypeScript
These tools are crucial for maintaining code quality, consistency, and catching potential errors early in the development cycle.
### ESLint for TypeScript
* **Purpose:**
Analyze your code for potential bugs, stylistic inconsistencies, and adherence to coding best practices. They don't fix code automatically, but they highlight issues and often provide suggestions. Catches errors early, enforces coding standards across teams, improves code readability, and enhances codebase robustness.
* **Key Tool:** ESLint is the de-facto standard linter for JavaScript and TypeScript. While historically TSLint was popular for TypeScript, it has been deprecated in favor of ESLint. The `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` packages allow ESLint to understand TypeScript syntax and apply TypeScript-specific linting rules.

* **Setup:**
```sh
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```
* **Configuration**:(both works)
::: code-group
```json [.eslintrc.json]
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```
```js [.eslintrc.js]
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
};
```
:::
* **Example (ESLint rule)**: ESLint might flag `const x = "hello"; if (x == 5) { ... }` because `==` can lead to unexpected type coercion (prefer `===`). Or it might warn if you declare a variable but never use it.

### Formatters for TypeScript
* **Purpose:** Automatically format your code to a consistent style, handling things like indentation, spacing, semicolons, line breaks, and bracket placement. They don't analyze code for bugs or logical issues; they just make it look pretty and consistent.\

    Ensures consistent code style across the entire project (critical for team collaboration), reduces cognitive load when reading code, and eliminates time wasted on style debates.
* **Key Tool:** **Prettier** is the most popular code formatter. It's highly opinionated, meaning it has a strong set of default rules, minimizing unimportant details over style preferences. It supports TypeScript, JavaScript, HTML, CSS, and many other languages.
* **Setup:**
```sh
npm install prettier eslint-config-prettier --save-dev
```
Linters and formatters are typically integrated into your IDE (e.g., VS Code extensions) to provide real-time feedback as you type.

## Real-World Workflow
This ecosystem makes TypeScript a robust choice for enterprise applications while maintaining developer productivity.

<FlowChart/>

<script setup>
    import FlowChart from '../../.vitepress/theme/components/FlowChart.vue'
</script>