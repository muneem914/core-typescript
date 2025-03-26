---
outline: deep
---

# Recursive Types
A **recursive** type is a type that references itself as part of its definition. This allows structures to be infinitely nested, like trees, linked lists, file systems, and hierarchical menus.  

**When to Use Recursive Types?**  
Recursive types are useful when working with nested data structures such as:
- Trees (e.g., DOM elements, company hierarchies)
- Linked lists (e.g., a sequence of nodes)
- File system structures (e.g., folders containing subfolders)  

::: tip Analogy  
Imagine a **folder** system on your computer:
- A **folder** can contain files.
- A **folder** can also contain **other folder**, which in turn contain files or more **folder**.
- This creates a **recursive structure**, where a folder **contains itself in a nested way.**  

A **folder** contains files and **subfolders**, where each **subfolder** is also a **Folder!**
This means we can define a **recursive type** to represent a folder structure.  
:::

## Simple Recursive Type for a Folder System
```ts
type Folder = {
  name: string;
  files: string[]; // List of file names
  subfolders?: Folder[]; // A folder can have subfolders (recursion)
};

const myDocuments: Folder = {
  name: "Documents",
  files: ["resume.pdf", "coverLetter.docx"],
  subfolders: [
    {
      name: "Projects",
      files: ["project1.ts", "project2.js"],
      subfolders: [
        {
          name: "TypeScript",
          files: ["typescript-notes.md"],
          subfolders: [],
        },
      ],
    },
  ],
};

console.log(myDocuments);
```
### How It Works
- `type Folder = { ... }` defines a type `Folder` to represent a file system folder.
- `subfolders?: Folder[];` is a recursive property, it means a `Folder` can contain an array of other `Folder` objects, which allows for nested folder structures.
- `const myDocuments: Folder = { ... }` creates a `Folder` object that representing a "Documents" folder.
- It includes `name`, `files` (an array of file names), and `subfolders` (an array of subfolders).
- The `subfolders` array contains nested `Folder` objects, and creates a hierarchical folder structure.
- The "Projects" folder contains a "TypeScript" subfolder.
- `console.log(myDocuments)` prints the `myDocuments` object to the console, which shows the nested folder structure and file lists.

## Recursive Type for a Tree Structure  
A tree is a data structure where each node has children. Let's model an organization hierarchy using a recursive type.
```ts
type Employee = {
  name: string;
  position: string;
  subordinates?: Employee[]; // Recursive reference
};

const ceo: Employee = {
  name: "Alice",
  position: "CEO",
  subordinates: [
    {
      name: "Bob",
      position: "CTO",
      subordinates: [
        { name: "Charlie", position: "Software Engineer" },
        { name: "Dave", position: "Data Scientist" },
      ],
    },
    {
      name: "Eve",
      position: "CFO",
    },
  ],
};

console.log(ceo);
```
### How It Works
- `type Employee = { ... }` defines a type `Employee` to represent an employee with a name, position, and optional subordinates.
- `subordinates?: Employee[];` is a recursive property, which allows an `Employee` to have an array of other `Employee` objects as subordinates, and creates a hierarchical structure.
- `const ceo: Employee = { ... }` creates an `Employee` object which representing the CEO, with a name, position, and subordinates.
- The `subordinates` array contains nested `Employee` objects, which representing the CEO's direct reports (CTO and CFO).
- The CTO (`Bob`) further has subordinates, and demonstrates the recursive structure.
- `console.log(ceo)` prints the `ceo` object to the console, displays the hierarchical employee structure.

## Recursive Type for a Linked List
A linked list is a sequence of nodes, where each node links to the next.
```ts
type ListNode = {
  value: number;
  next?: ListNode; // Recursive reference
};

// Creating a linked list: 10 → 20 → 30 → null
const linkedList: ListNode = {
  value: 10,
  next: {
    value: 20,
    next: {
      value: 30,
    },
  },
};

console.log(linkedList);
```
### How It Works
- `type ListNode = { ... }` defines a type `ListNode` to represent a node in a linked list.
- `next?: ListNode;` is a recursive property, which allows a `ListNode` to have a reference to the next `ListNode` in the list.
- `const linkedList: ListNode = { ... }` creates a `ListNode` object that represents the head of a linked list.
- The `next` property of each node points to the next node in the sequence, and forms the linked list structure.
- The last node in the list has its `next` property implicitly set to `undefined` (or can be explicitly set to `null`).
- `console.log(linkedList)` prints the `linkedList` object, that displays the linked list structure.

## Handling Recursive Types in Functions

To process recursive types, we often use recursion in functions.  
**Example: Counting Files in a Folder (Recursive Function)**
```ts
function countFiles(folder: Folder): number {
  let fileCount = folder.files.length;

  if (folder.subfolders) {
    for (const subfolder of folder.subfolders) {
      fileCount += countFiles(subfolder); // Recursive call
    }
  }

  return fileCount;
}

console.log(countFiles(myDocuments)); // Output: Total number of files
```
### How It Works
- `countFiles` function takes a `Folder` and returns the total file count.
- `fileCount` is initialized with the current folder's file count.
- If subfolders exist, `countFiles` is recursively called for each subfolder.
- The returned subfolder file count is added to `fileCount`.
- The total `fileCount` is returned.
- `console.log` calls `countFiles` with `myDocuments` and logs the result.

## Key Takeaways
- A type that references itself to create nested structures.
- Trees, linked lists, file systems, organizational hierarchies.
- Allows infinite nesting while maintaining strong type safety.
- Can cause infinite loops if not handled properly.
- Use optional properties (`?`) to prevent excessive recursion.

