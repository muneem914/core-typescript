---
sidebar_position: 6
---

# Modules  
In TypeScript (and JavaScript), a module is just a file that contains code. You can export code from one file and import it into another file to use it.

Think of it like packing and unpacking boxes!
- **Exporting** is like packing things in boxes.
- **Importing** is like opening the boxes to use what’s inside.  

Modules help you organize code, reuse functions, and keep everything manageable as your project grows.  


## Exporting and Importing in TypeScript 

There are **two** main types of exports:  
1. **Named Exports**
2. **Default Exports**  

Let's explore  . . . 

### Named Exports  
Named exports allow you to export multiple things from a file, and you need to use the same name when importing them.  

***Analogy:** Imagine you have a toolbox. You label each tool (like hammer, screwdriver) so you can pick the exact tool you need later.*
```ts title="File: tools.ts" 
// Exporting named items
export const hammer = "Hammer";
export const screwdriver = "Screwdriver";

export function useTool(tool: string) {
  console.log(`Using the ${tool}`);
}
```
Now, importing to `main.ts`
```ts title="File: main.ts" 
// Importing named items
import { hammer, screwdriver, useTool } from "./tools";

console.log(hammer); // Output: Hammer
console.log(screwdriver); // Output: Screwdriver

useTool(hammer); // Output: Using the Hammer
```
**Explanation:**  
- `export` - Packs items in the toolbox.
- `import` - Picks specific tools by name.  

**If you try to change the name during import, you’ll get an error:**
```ts title="TypeScript"
import { hammer as mallet } from "./tools";
console.log(mallet); // ✅ This works (renaming during import)
```
**If You Import the Wrong Name:**
```ts title="TypeScript"
import { wrench } from "./tools"; 
// ❌ Error: 'wrench' is not exported
```
***Analogy Recap:** Named exports are like labeled tools. You need to call them by their exact name (or rename on import).*

### Default Exports  
Default exports let you export only one thing per file. When importing, you can name it whatever you want.  

***Analogy:** Imagine a mystery gift box. You don’t know what’s inside, but when you open it, you can call it whatever you like!*

```ts title="File: gift.ts" 
// Default export
export default function surpriseGift() {
  console.log("You received a surprise gift!");
}
```
Now, importing to `main.ts`
```ts title="File: main.ts" 
// Importing a default export
import gift from "./gift";

gift(); // Output: You received a surprise gift
```
**Explanation:**  
- `export default` - Packs one item in a box.
- `import` - Opens the box and names the item freely.  

**Renaming the Default Import:**
```ts title="TypeScript"
import surprise from "./gift";

surprise(); // Output: You received a surprise gift
```
***Analogy Recap:** Default exports are like a mystery gift. You decide what to call it when you open it.*

## Combining Named and Default Exports
You can use both named and default exports in the same file!

```ts title="File: store.ts" 
// Named exports
export const item1 = "Apple";
export const item2 = "Banana";

// Default export
export default function storeName() {
  console.log("Welcome to the Fruit Store!");
}
```
Now, importing to `main.ts`
```ts title="File: main.ts" 
// Importing named and default exports
import store, { item1, item2 } from "./store";

store(); // Output: Welcome to the Fruit Store!
console.log(item1); // Output: Apple
console.log(item2); // Output: Banana
```

## Module Resolution  
Module resolution is how TypeScript figures out where to find your files.  
In the examples above, we used: 
```ts
import { something } from "./file";
```
- `./` - Means same folder.
- `../` - Means go up one folder.  

TypeScript compiles this to JavaScript so browsers or Node.js can understand the final result.  
You can configure module resolution in your tsconfig.json file:
```json title="json"
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node"
  }
}
```
***Real-world analogy for Module Resolution:***  

Think of your project like a big house:
- Rooms (folders) contain boxes (files).
- Path (`./`) tells you which room to enter.
- Labels (exports) help you pick the right item.

## Summary
| Concept           | Explanation                                | Analogy                      |
|------------------|--------------------------------|----------------------------|
| **Named Exports**  | Export multiple things, import by exact name | Toolbox with labeled tools  |
| **Default Exports** | Export one thing, import with any name       | Mystery gift box            |
| **Module Resolution** | Determines where to find files during import | Finding rooms in a house    |
