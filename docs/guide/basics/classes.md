---
sidebar_position: 5
---

# Classes  
A class is like a blueprint or a template for creating objects. It defines the properties (data) and methods (actions) that an object should have.  
Think of a class like a recipe. It tells you what ingredients (properties) you need and how to cook (methods).  
Let's explore the core concepts one by one!
## Class Basics
In TypeScript, a class is defined using the `class` keyword just like javascript does.

***Analogy:***  

*Imagine a blueprint for a house. The blueprint tell you:*
- *What the house will have (like doors, windows and rooms).*
- *What actions you can perform (like opening doors or turning on lights).*

*Once you have the blueprint, you can build as many houses as you want, all following the same design.!*  

Let's see this in code:
```ts title="TypeScript"
class House {
  rooms: number; 
  color: string; 

  constructor(rooms: number, color: string) {
    this.rooms = rooms;
    this.color = color;
  }

  describe() {
    console.log(`This house has ${this.rooms} rooms and is painted ${this.color}.`);
  }
}

// Creating a house object
const myHouse = new House(3, "blue");
myHouse.describe();
```
```bash title="Output"
This house has 3 rooms and is painted blue.
```
**Explanation:**
- **Class:** Which is the blueprint (House).
- **Properties:** Which is rooms and color (House characteristics).
- **Constructor:** Which is the function that builds the house.
- **Method:** `describe()` Which tells you about the house (note: you can write anything instead of *describe*).  

See another example:
```ts title="TypeScript"
class Person {
  name: string; // these are properties
  age: number; // these are properties

  // Constructor: Initializes object properties to build the object 
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method: A function inside a class to represent the details or the output
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Creating an object from the class
const person1 = new Person("Alice", 25);
person1.greet(); 
```
```bash title="Output"
Hello, my name is Alice and I am 25 years old.
```
As simple as that !  

## Public, Private, and Protected Modifiers  
In TypeScript, you can control how accessible the class properties and methods are using access modifiers:

- **Public**: Accessible from anywhere/anyone (default). *For example: Main door of a house which can be accessed by anyone.*
- **Private**: Accessible only within the class itself. *For example: The owner of the house can access in only. (ike a bedroom).*
- **Protected**: Accessible within the class and its subclasses. *For example: Only family members can access it (like a family room, dining, drawing room etc)* 

Let’s break them down!  
### Public (Default)  
Public properties and methods can be accessed from anywhere. `public` keyword is used to make a public blueprint or you can make public blueprint without writing public itself.
```ts title="TypeScript"
class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person = new Person("Alice");
console.log(person.name); // ✅ Accessible
person.greet();           // ✅ Accessible
```
```bash title="Output"
Alice
Hello, my name is Alice.
```
***Analogy:** Public is like car horn, anyone nearby can hear it. Or it is like main door of the house, anyone can access it.*  

### Private  
Private properties and methods can only be accessed inside the class itself. `private` keyword is used to make a class private.
```ts title="TypeScript"
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  public deposit(amount: number) {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  private showBalance() {
    console.log(`Balance: $${this.balance}`);
  }
}

const account = new BankAccount(1000);
account.deposit(500);     // ✅ Works
// account.balance = 2000; // ❌ Error: Property 'balance' is private
// account.showBalance();  // ❌ Error: Method 'showBalance' is private

// Output:
// Deposited $500. New balance: $1500
// (Deposit is public so it can be accessed by everyone)

```
***Analogy:** Private is like the engine of a car. You can't access it directly while driving. You can only control it through the car's interface (by pressing the accelerator). Or it is like your bedroom. No one can go inside unless you let them!*

### Protected  
Protected properties and methods can ony be accessed within the class and its subclasses.
```ts title="TypeScript"
class Animal {
  protected sound: string;

  constructor(sound: string) {
    this.sound = sound;
  }

  protected makeSound() {
    console.log(`The animal makes a ${this.sound} sound.`);
  }
}

class Dog extends Animal {
  public bark() {
    this.makeSound(); // ✅ Accessible in subclass
  }
}

const dog = new Dog("bark");
dog.bark(); // ✅ Works
// dog.makeSound(); // ❌ Error: 'makeSound' is protected

// Output:
// The animal makes a bark sound.
```
***Analogy:** Protected is like the gearbox of a car. A mechanic (subclass) can access it, but you can't directly touch it while driving. Or it is like a family room. Where only family members (subclass) can enter, but strangers can't*

## Readonly Properties  
A readonly properly can only be set once. Either when declared or in the constructor.
```ts title="TypeScript"
class Book {
  readonly title: string;

  constructor(title: string) {
    this.title = title;
  }
}

const book = new Book("The Great Gatsby");
console.log(book.title); // ✅ Can read
// book.title = "New Title"; // ❌ Error: Cannot assign to 'title' because it is a read-only property

// Output:
// The Great Gatsby
```
***Analogy:** Readonly is like a car's VIN (Vehicle Identification Number). It's set when the car is made and cannot be changed. Or it is like house address. You can only read it, but you can't change the address after the house is built*  

## When to Use What?
- Use `public`: For properties/methods you want accessible to everywhere.
- Use `private`: For sensitive data or properties/methods that should be hidden from the outside.
- Use `protected`: For properties/methods that should only be accessed in subclass.
- Use `readonly`: For properties that should never change after being set once.


## Summary
| Feature    | Explanation                     | Analogy 1         | Analogy 2         |
|-----------|---------------------------------|-------------------|-------------------|
| **Class**    | Blueprint for creating objects | House blueprint   | Car assembly blueprint |
| **Public**   | Accessible anywhere           | Main door        | Car horn          |
| **Private**  | Accessible only inside the class | Bedroom          | Car engine        |
| **Protected** | Accessible in class and subclasses | Family room     | Car gearbox (accessible to mechanic) |
| **Readonly** | Can only be set once         | House address    | Car VIN           |