---
outline: deep
---

# Advanced Type Features
Let’s explore some powerful TypeScript features step by step with examples and analogies! 

## Recursive Types
A **recursive** type is a type that references itself as part of its definition. This allows structures to be infinitely nested, like trees, linked lists, file systems, and hierarchical menus.  

**When to Use Recursive Types?**  
Recursive types are useful when working with nested data structures such as:
- Trees (e.g., DOM elements, company hierarchies)
- Linked lists (e.g., a sequence of nodes)
- File system structures (e.g., folders containing subfolders)  

***Analogy:***  
Imagine a **folder** system on your computer:
- A **folder** can contain files.
- A **folder** can also contain **other folder**, which in turn contain files or more **folder**.
- This creates a **recursive structure**, where a folder **contains itself in a nested way.**  

A **folder** contains files and **subfolders**, where each **subfolder** is also a **Folder!**
This means we can define a **recursive type** to represent a folder structure.  

**Example-1: Defining a Recursive Type for a Folder System**
```ts title="TypeScript"
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
The

**Example-2: Recursive Type for a Tree Structure**  
A tree is a data structure where each node has children. Let's model an organization hierarchy using a recursive type.
```ts title="TypeScript"
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
The

**Example-3: Recursive Type for a Linked List**  
A linked list is a sequence of nodes, where each node links to the next.
```ts title="TypeScript"
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
The

### Handling Recursive Types in Functions

To process recursive types, we often use recursion in functions.
**Example: Counting Files in a Folder (Recursive Function)**
```ts title="TypeScript"
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
The

### Key Takeaways
- A type that references itself to create nested structures.
- Trees, linked lists, file systems, organizational hierarchies.
- Allows infinite nesting while maintaining strong type safety.
- Can cause infinite loops if not handled properly.
- Use optional properties (`?`) to prevent excessive recursion.

