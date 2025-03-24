---
outline: deep
---

<!-- # Classes
 -->


# Abstract Classes
Abstract classes are the base classes that cannot be instantiated directly; in simple term you cannot use an abstract class directly. They act as a blueprints for derived or sub-classes. Abstract classes can define both concrete (implemented) methods and abstract (unimplemented) methods. Subclasses that extends an abstract class, must implement all of its abstract methods; it means, when you have to define subclass, which is derived from abstract class, you must implement abstract methods properly.

In simple term, abstract class in TypeScript serves as a blueprint for other classes. It's like a partially built structure where you can define some common features and behaviors, but you can't live in it directly. You need to build upon it to create a functional house.

**Key Characteristics:**
- **Cannot be instantiated**: You can't create an object directly from an abstract class. It's meant to be extended with sub-classes.
- **Blueprint for subclasses:** It acts as a template for other classes to inherit from.   
- **Can contain concrete methods**: It can have methods with full implementations, which are then inherited by its subclasses.   
- **Can contain abstract methods**: It can define methods without any implementation (abstract methods). Subclasses that extend the abstract class must provide implementations for all these abstract methods.

Abstract classes are used to establish a common structure and behavior for a group of related classes. They enforce a contract, that ensures all derived classes will share certain functionalities and behavior while specific implementations in each subclass are required.

::: tip Analogy
Imagine you’re an architect who creates a blueprint for a building. This blueprint outlines the common design elements that all buildings must have (like door placements, support structures, etc.), but it doesn’t represent a finished, livable building. Instead, individual construction projects (houses, offices, etc.) will follow this blueprint and add their own specifics.

- **Abstract Class**: The blueprint (defines common structure and rules).
- **Concrete Class**: The actual building (instantiated and used in real life).
:::

## Basic Abstract Class
Imagine you’re designing a blueprint for vehicles. Every vehicle should have a method to start the engine, but the way each vehicle does that might differ.
```ts 
// Defining an abstract class "Vehicle" with an abstract method "startEngine" and concrete method "move"
abstract class Vehicle {

//  A concrete method
  move(): void {
    console.log("The vehicle is moving.");
  }

  // An abstract method
  abstract startEngine(): void;
}

// Car is an inherited/derived/sub class from abstract class "Vehicle"
class Car extends Vehicle {
  startEngine(): void {
    console.log("Car engine started with a key turn.");
  }
}
// Similarly, Motorcycle is an inherited/derived/sub class from abstract class "Vehicle"
class Motorcycle extends Vehicle {
  startEngine(): void {
    console.log("Motorcycle engine started with a button press.");
  }
}

// Usage: 
const myCar = new Car();
myCar.startEngine(); // Output: Car engine started with a key turn.
myCar.move();        // Output: The vehicle is moving.

const myBike = new Motorcycle();
myBike.startEngine(); // Output: Motorcycle engine started with a button press.
myBike.move();        // Output: The vehicle is moving.
```
### How It Works
- `Vehicle` is an `abstract class`, means it cannot be instantiated or used directly. It contains both concrete and abstract methods.
- `move()` is a concrete method, which have complete definition or method body, but it can be overridden by inherited class; or you can say its a common behavior shared by all vehicle providing a default implementation that can be overridden by subclasses. <Badge type="danger" text="Note:" /> If its not overridden, it will be act as a default behavior of all sub-classes which are inherited from `abstract class Vehicle`.
- `startEngine()` is an `abstract method`, which means it has no method body or it has no implementation. So it requires subclasses to provide their own implementation.
- Both `Car` and `Motorcycle` are subclasses or derived classes or inherited classes from an `abstract` classes like `Vehicle`. Both sub-classes requires specific implementations for `abstract` method `startEngine()`.
- `myCar` and `myBike` are instances of `Car` and `Motorcycle` subclasses/derived classes, which have common functionalities (like: The vehicle is moving), but the different engine starting behaviors.
- This is how Abstract classes enforce a contract, which ensures subclasses implementation with necessary methods.

## Abstract class with a `constructor`
This is similar to above example but this time, with a `constructor`, to initialize common properties (`brand` and `model`)
```ts
// Abstract class "Vehicle" with a constructor to set common properties
abstract class Vehicle {
  constructor(public brand: string, public model: string) {}

  // Concrete method to display vehicle info
  displayInfo(): void {
    console.log(`Vehicle: ${this.brand} ${this.model}`);
  }

  // Abstract method: force subclasses to implement how the vehicle starts
  abstract startEngine(): void;
}

// Concrete class "Car" extends "Vehicle"
class Car extends Vehicle {
  startEngine(): void {
    console.log("The car engine starts with a roar!");
  }
}

// Concrete class "Motorcycle" extends "Vehicle"
class Motorcycle extends Vehicle {
  startEngine(): void {
    console.log("The motorcycle engine starts with a vroom!");
  }
}

// Usage:
const myCar = new Car("Toyota", "Corolla");
myCar.displayInfo();   // Output: Vehicle: Toyota Corolla
myCar.startEngine();   // Output: The car engine starts with a roar!

const myMotorcycle = new Motorcycle("Harley-Davidson", "Sportster");
myMotorcycle.displayInfo();   // Output: Vehicle: Harley-Davidson Sportster
myMotorcycle.startEngine();   // Output: The motorcycle engine starts with a vroom!
```

## Abstract Class with Both Abstract and Concrete Members 
Here’s a more complex scenario where the abstract class provides a default behavior but forces derived classes to provide specific details.

```ts
abstract class Employee {
  constructor(public name: string) {}

  // Concrete method shared by all employees
  work(): void {
    console.log(`${this.name} is working.`);
  }

  // Abstract method to calculate salary (different for each employee type)
  abstract calculateSalary(): number;
}

class FullTimeEmployee extends Employee {
  constructor(name: string, private monthlySalary: number) {
    super(name);
  }
  calculateSalary(): number {
    return this.monthlySalary;
  }
}

class PartTimeEmployee extends Employee {
  constructor(name: string, private hourlyRate: number, private hours: number) {
    super(name);
  }
  calculateSalary(): number {
    return this.hourlyRate * this.hours;
  }
}

const emp1 = new FullTimeEmployee("Alice", 5000);
const emp2 = new PartTimeEmployee("Bob", 20, 80);

emp1.work(); // Output: Alice is working.
console.log(emp1.calculateSalary()); // Output: 5000

emp2.work(); // Output: Bob is working.
console.log(emp2.calculateSalary()); // Output: 1600
```
### How It Works
- `Employee` is an `abstract class` with a constructor, a concrete `work()` method, and an abstract `calculateSalary()` method.
- `FullTimeEmployee` and `PartTimeEmployee` extend `Employee` and provide their own implementations for `calculateSalary()`.
- `emp1` and `emp2` are instances of the concrete classes, demonstrating polymorphism through the `calculateSalary()` method.
- The `work()` method is inherited and shared by both employee types.
- Abstract classes define a common structure and enforce implementation of specific methods in subclasses.

::: details *How `super` works ?*
The keyword `super` in a class plays a crucial role in object-oriented programming, particularly in the context of inheritance. Basically it used within a class (specifically in a subclass or derived class) to refer its parent class. It allows us to access and call methods, constructors, and properties of the parent class from within the subclass.   

**Importance of `super`:**

1. **Accessing Parent Class Members**: `super` allows a subclass to access methods and fields of its parent (superclass), even if those members have been overridden in the subclass. This is essential for reusing and extending the functionality of the parent class.
2. **Calling Parent Class Constructors**: When a subclass object is created, the constructor of its parent class needs to be called to initialize the inherited properties. `super()` is used within the subclass constructor to explicitly call the parent's constructor. This ensures proper initialization of the object.
3. **Resolving Name Conflicts**: If a subclass has a method or field with the same name as one in its parent class, `super` can be used to specifically refer to the parent's version, avoiding ambiguity.

:::

## Abstract Classes with Template Method Pattern
The **Template Method Pattern** is a design pattern where an abstract class defines the skeleton of an algorithm, deferring some steps to subclasses. This pattern allows you to vary parts of an algorithm without changing its structure.
```ts
// Defining abstract class "DataProcessor" with the template method "processData"
abstract class DataProcessor {
  // Template method: defines the steps for processing data
  processData(): void {
    this.readData();
    const processed = this.transformData();
    this.saveData(processed);
  }

  // Abstract methods: steps to be implemented by subclasses
  protected abstract readData(): void;
  protected abstract transformData(): any;
  protected abstract saveData(data: any): void;
}

// Concrete class "CSVProcessor" implements the abstract methods
class CSVProcessor extends DataProcessor {
  protected readData(): void {
    console.log("Reading data from a CSV file...");
  }

  protected transformData(): string {
    console.log("Transforming CSV data...");
    return "Processed CSV Data";
  }

  protected saveData(data: string): void {
    console.log(`Saving data: ${data}`);
  }
}

// Concrete class "JSONProcessor" implements the abstract methods
class JSONProcessor extends DataProcessor {
  protected readData(): void {
    console.log("Reading data from a JSON file...");
  }

  protected transformData(): object {
    console.log("Transforming JSON data...");
    return { data: "Processed JSON Data" };
  }

  protected saveData(data: object): void {
    console.log("Saving data:", data);
  }
}

// Usage:
const csvProcessor = new CSVProcessor();
csvProcessor.processData();
// Output:
// Reading data from a CSV file...
// Transforming CSV data...
// Saving data: Processed CSV Data

const jsonProcessor = new JSONProcessor();
jsonProcessor.processData();
// Output:
// Reading data from a JSON file...
// Transforming JSON data...
// Saving data: { data: "Processed JSON Data" }
```

### How It Works

- `DataProcessor` is an `abstract class` where `processData()`is a template method which provides the skeleton for processing.
- `processData()` defines the sequence of steps, while delegating the actual implementation to abstract methods.
- `readData()`, `transformData()`, and `saveData()` are abstract methods that subclasses must implement.
- `CSVProcessor` and `JSONProcessor` are concrete classes that implement the abstract methods for CSV and JSON data processing, respectively.
- The template method `processData()` remains the same, but the specific operations are tailored to each data format.
- This demonstrates the Template Method pattern, where a common algorithm structure is defined, and subclasses provide specific implementations for certain steps.

::: warning <u>Analogy Recap for Abstract Classes</u>
Imagine a car manufacturing assembly line:

- **Abstract Blueprint (Abstract Class)**: The assembly line has a fixed set of steps—chassis assembly, painting, engine installation, and final inspection.
- **Custom Options (Concrete Classes)**: Different car models (sedan, SUV, sports car) follow the same overall process but differ in specifics (engine type, paint color, interior design).
- **Template Method Pattern**: The assembly line (template method) defines the steps, while each car model provides its own specific implementations of those steps.

This approach ensures every car built follows the same quality process while allowing unique customizations.
:::

## Key Takeaways
| Aspect             | Abstract Classes                                                                 |
|--------------------|-----------------------------------------------------------------------------------|
| Purpose            | Provide a common blueprint with shared behavior.                                 |
| Instantiation      | Cannot instantiate directly; must be subclassed.                                |
| Abstract Methods   | Must be implemented in derived classes.                                           |
| Use Cases          | When you need common functionality plus enforced contracts (e.g., vehicles, data processors). |

# Static Members

::: tip Analogy

:::

# Method Overloading

::: tip AnalogyI

:::
