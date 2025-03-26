---
outline: deep
---


# Static Members

In TypeScript (and in many other object-oriented languages), static members (properties and methods) belong to the class itself rather than to any instance of that class. They are accessed directly on the class and shared by all instances. That means:

- **Static Properties**: Store values that are shared across all instances.
- **Static Methods**: Define behavior or utility functions that don’t depend on instance data.

They are accessed using the class name, not through an instance, which can be very useful when you need a common value or helper function across all objects of that class.

Think of a class as a blueprint for building objects. Normally, each object you build from the blueprint gets its own copy of all the parts. But static members are different. They're like parts of the blueprint itself, not the things built from it.

::: tip Analogy
Imagine a large company:

- **Instance Members**: These are like attributes unique to each employee (e.g., name, job title, individual work schedule).
- **Static Members**: These are like the company’s policies or the company logo. No matter how many employees there are, the company’s policies remain the same and are accessible via the company itself, not each individual employee.

**_Another analogy_**: Think of a car model. Each car (instance) has its own color or mileage, but every car of that model shares the same number of wheels. The number of wheels is a static property on the car model.
:::

## Static Method

A static method can be used as a helper function that doesn’t require an instance of the class.

```ts
class MathUtils {
  static add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.add(5, 7)); // Output: 12
```

### How It Works

- The `MathUtils` class defines a static method `add`.
- Static methods belong to the class itself, not to instances of the class.
- You call `MathUtils.add(5, 7)` directly without creating an instance of `MathUtils`.
- The `add` method takes two number arguments (`a` and `b`) and returns their sum.
- `MathUtils.add` provides a utility function accessible directly from the class.

## Simple Static Property and Method

```ts
class Circle {
  // Static property: shared among all instances
  static pi: number = 3.14;

  // Instance property: unique to each Circle instance
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  // Instance method that uses the static property
  area(): number {
    return Circle.pi * this.radius * this.radius;
  }

  // Static method: can be called on the class itself
  static calculateCircumference(radius: number): number {
    return 2 * Circle.pi * radius;
  }
}

// Creating an instance of Circle
const circle1 = new Circle(10);
console.log("Area of circle1:", circle1.area());
// Output: Area of circle1: 314

// Accessing the static method using the class name
console.log("Circumference with radius 10:", Circle.calculateCircumference(10));
// Output: Circumference with radius 10: 62.8
```

### How It Works

- `Circle.pi` is a static property, which means it is shared by all instances of the `Circle` class.
- It's accessed using the class name (`Circle.pi`).
- `this.radius` is an instance property, which means each `Circle` object has its own unique `radius` value.
- `this.area()` is an instance method that calculates the area of a circle using the static `Circle.pi` property and the instance's `radius`.
- `Circle.calculateCircumference()` is a static method that calculates the circumference of a circle.
- It's called directly on the `Circle` class, not on a `Circle` instance.
- The code demonstrates creating a `Circle` instance, calculating its area, and calling the static `calculateCircumference` method.

## Counting Instances Using a Static Member

Static members can also help track information across all instances of a class. Let’s say you want to keep track of how many instances of a class have been created.

```ts
class Person {
  // Static property to count the number of Person instances created
  static count: number = 0;

  // Instance property
  name: string;

  constructor(name: string) {
    this.name = name;
    // Increment the static count every time a new instance is created
    Person.count++;
  }

  // Static method to get the current count
  static getCount(): number {
    return Person.count;
  }
}

// Creating instances of Person
const alice = new Person("Alice");
const bob = new Person("Bob");
const charlie = new Person("Charlie");

console.log("Total persons:", Person.getCount());
// Output: Total persons: 3
```

### How It Works

- `Person.count` is a static property which is initialized to 0.
- It's used to keep track of the number of `Person` instances created.
- As we know static properties belong to the class itself, not to individual instances. So;
- `this.name` is an instance property, unique to each `Person` object.
- The constructor takes a `name` parameter and assigns it to the `name` property.
- It increments the static `Person.count` property each time a new `Person` object is created.
- `Person.getCount()` is a static method that returns the current value of `Person.count`.
- It's called directly on the `Person` class.
- The code creates three `Person` instances (`alice`, `bob`, `charlie`).
- `Person.getCount()` is then called to retrieve and log the total number of `Person` instances created.

**Simplified example of counting instances using static member**

```ts
class Counter {
  static count = 0; // Static property

  constructor() {
    Counter.count++; // Increment static count on each instance creation
  }

  static getCount(): number {
    return Counter.count;
  }
}

const a = new Counter();
const b = new Counter();
console.log(Counter.getCount()); // Output: 2
```

As simple as that !

## Static Members in Inheritance and Utility Functions

Static members can also be inherited and overridden (or shadowed) by subclasses/derived-class. They can serve as helper functions or constants that define behavior for a class hierarchy.

```ts
class Vehicle {
  // Static property representing a common property for all vehicles
  static numberOfWheels: number = 4;

  // Instance property
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  // Instance method that uses the static property
  describe(): void {
    console.log(
      `${this.brand} vehicle typically has ${Vehicle.numberOfWheels} wheels.`
    );
  }

  // Static method: a utility function related to vehicles
  static isMotorized(): boolean {
    return true;
  }
}

class Motorcycle extends Vehicle {
  // Shadowing/overriding the static property with a value specific to motorcycles
  static numberOfWheels: number = 2;

  constructor(brand: string) {
    super(brand);
  }

  // Overriding the instance method to use the subclass's static property
  describe(): void {
    // Use Motorcycle.numberOfWheels for motorcycles
    console.log(
      `${this.brand} motorcycle typically has ${Motorcycle.numberOfWheels} wheels.`
    );
  }
}

// Using the base class
const car = new Vehicle("Toyota");
car.describe();
// Output: Toyota vehicle typically has 4 wheels.

// Using the subclass
const bike = new Motorcycle("Suzuki");
bike.describe();
// Output: Suzuki motorcycle typically has 2 wheels.

// Accessing static methods
console.log("Are vehicles motorized?", Vehicle.isMotorized());
// Output: Are vehicles motorized? true

// Accessing static properties directly from the classes
console.log("Car wheels (from class):", Vehicle.numberOfWheels);
// Output: Car wheels (from class): 4

console.log("Motorcycle wheels (from class):", Motorcycle.numberOfWheels);
// Output: Motorcycle wheels (from class): 2
```

### How It Works

- The `Motorcycle` class shadows/overrides the `Vehicle.numberOfWheels` static property with its own value (2).
- This allows subclasses/derived-classes to have their own specific static property values.
- The `Motorcycle` class overrides the `describe()` instance method.
- Inside the overridden method, it uses `Motorcycle.numberOfWheels` to access the subclass's static property.
- The `Vehicle.isMotorized()` static method is inherited by the `Motorcycle` class.
- Static properties are accessed using the class name (`Vehicle.numberOfWheels`, `Motorcycle.numberOfWheels`).
- Instances of `Vehicle` and `Motorcycle` use the instance property `brand` and the `describe()` instance method.
- The `describe()` method behaves differently for `Vehicle` and `Motorcycle` instances, demonstrating polymorphism.

::: warning <u>Analogy Recap for Static Members</u>

- **Company Policies**: Just as company policies apply to the entire organization (and are not part of an individual employee's data), static members belong to the class as a whole. For example: Policies like "vacation days" or "company name" apply to all employees (static), not individual employees (instances).
- **Shared Resources**: Like the blueprint for a car model where every car shares the same number of wheels, static properties provide common values that all instances can use.
- **Utility Functions**: Think of static methods as centralized utility functions (like a company’s centralized IT support) that assist all employees without being tied to any single person.
  :::

## Key Takeaways

| Aspect      | Static Members                                            |
| ----------- | --------------------------------------------------------- |
| Definition  | Belong to the class itself rather than instances.         |
| Usage       | Shared constants, helper functions, or shared data.       |
| Access      | Accessed using the class name (e.g., `ClassName.member`). |
| Inheritance | Can be inherited or shadowed in subclasses.               |


> [!NOTE]
> If you are facing issues in understanding classes then you can visit [Basic Classes](/guide/basics/classes) first.


