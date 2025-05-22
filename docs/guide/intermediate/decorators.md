---
outline: deep
---

# Decorators

Decorators are a special syntax in TypeScript (using the `@` symbol) that you put right before you define a class, a method inside a class, a property of a class, or even a parameter of a method. They're like little tags that tell TypeScript to run some extra code when that thing (class, method, etc.) is being defined.\
In simple term, 
When TypeScript sees a decorator `@something` before something else, it calls the `something` part (which is a `function` we write) and gives it some information about what it's decorating.
::: tip Analogy
Imagine you have a plain cake (your basic class, method, property, or parameter). Decorators are like special toppings or decorations you can add to this cake to make it do extra things or have extra features, without changing the original cake recipe itself. 
:::
**For Example:**
```ts
function MySpecialLabel(TargetClass: Function) {
  console.log(`The cake box for "${TargetClass.name}" just got its special label!`);
}

@MySpecialLabel // <--- This is the decorator right above the class
class ChocolateCake { // <--- This is the blueprint that makes the cake
  constructor() {
    console.log("Chocolate cake is baked!");
  }
}

new ChocolateCake(); // This makes the cake.

// Output when you run the code:
// The cake box for "ChocolateCake" just got its special label!
// Chocolate cake is baked!
```
**How it Works Simply:**
1. We have a normal `ChocolateCake` class (which is also a type of function).
2. `MySpecialLabel` is a function that acts as our decorator. It gets the `ChocolateCake` class itself as `input(TargetClass)`.
    - To use this decorator it should place right above the `class ChocolateCake` like this `@MySpecialLabel`
3. The `@MySpecialLabel` right above the `class ChocolateCake` tells TypeScript: "Hey, when you define this `ChocolateCake` class, immediately run the `MySpecialLabel` function and give it the `ChocolateCake` class."
    - The **Class Decorator** (`@MySpecialLabel`) is like a special worker standing at the design table (where the blueprint of the cake is being created).
    - And the `class ChocolateCake` is the **blueprint** for making chocolate cakes.
4. When TypeScript sees `@MySpecialLabel` right above `class ChocolateCake`, it's like the special worker immediately grabs the `ChocolateCake` blueprint.
    - So, even before you create an actual `ChocolateCake` (with new `ChocolateCake()`), the `MySpecialLabel` function has already run and logged its message, because the class definition itself was "labeled." It means the decorator (`@MySpecialLabel`) doesn't wait for you to make a chocolate cake (like `new ChocolateCake()`). It acts directly on the idea or the design of the `ChocolateCake`.
    - **It's like this**: as soon as the blueprint for "Chocolate Cake" is finished and placed on the table, the special worker immediately puts a sticker (the "label") directly onto that blueprint, saying "This blueprint was created at [time]!"

**Why Decorators?**\
Decorators make your code cleaner and more organized. Instead of scattering extra logic (like logging, checking permissions, or managing settings) throughout your classes and methods, you can put that logic into reusable decorator functions. This makes your main code focus on what it's supposed to do, while the decorators handle the "extra sprinkles."
::: details Need to Know {open}
A decorator is a programming design pattern in which you wrap something to change its behavior. This feature is currently at stage three in JavaScript. Decorators are not new; several programming languages, such as Python, Java, and C#, adopted this pattern before JavaScript. Further refinement of the syntax will require feedback from implementation and users.

To enable Decorators in TypeScript you may need to add this into your `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```
Or\
You can do this by command line:
```sh
tsc --target ES5 --experimentalDecorators
```
:::
## Class Decorators
Class decorators are functions that can modify or replace a class declaration. They receive the constructor of the class as an argument and can be used to add additional properties or logic to the class, or even replace the class with a new constructor.\
Just like previously you saw a perfect example of class decorator.
### Example 1: Basic Class Decorator
```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  constructor(public name: string) {}
}

const p = new Person("Muneem");
console.log(p.name); // Output: Muneem
```
**How it Works:**
* Decorator function `sealed` that takes the `constructor` of a class as an argument.
* `Object.seal();` prevent additions or deletions of properties on an object. It essentially makes an object non-extensible and sets all existing properties to non-configurable.
* `@sealed` applies the `sealed` decorator to the `Person` class which makes both the class constructor and its prototype sealed.
* `class Person { ... }` defines the `Person` class with a `name` property.
* `const p = new Person("Muneem");` creates an instance `p` of the `Person` class.
* The output remains the same, but the class is now locked.
### Example 2: Decorator That Modifies a Class
```ts
function addTimestamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    timestamp = new Date();
  };
}

@addTimestamp
class Order {
  constructor(public orderId: number) {}
}

const order = new Order(123);
console.log(order.orderId);   // Output: 123
console.log(order.timestamp); // Output: [Current Date Object]
```
**How it Works**
* Here `addTimestamp` is a class decorator.
* `<T extends { new (...args: any[]): {} }>`: This [generic constraint](generics/generic-constraints#generic-constraints) ensures that `T` is a constructor function.
* `return class extends constructor { ... };` The decorator **returns a new anonymous class** that extends the original `constructor` (the class it's decorating).
* `timestamp = new Date();` This new class adds a `timestamp` property to the instances, initialized with the current date and time.
* `@addTimestamp` applies the `addTimestamp` decorator to the `Order` class.
* `class Order { ... }` defines the `Order` class with an `orderId` property.
* When you create an instance, you see both the original property and the new `timestamp`.
* `const order = new Order(123);` creates an instance `order` of the `Order` class. **Due to the decorator**, `order` will also have a `timestamp` property which represents the creation time.

::: tip Analogy
Imagine a class as a standard car model. A class decorator is like an upgrade package you install during production that adds extra features (like a GPS system) to every car of that model. All cars produced with that upgrade come with the additional features automatically.
:::

## Method and Property Decorators
Method and property decorators allow you to modify or annotate methods and properties within a class. They are applied to the target property or method and can intercept and modify behavior.
- **Method Decorators**: Can alter the method, log calls, or even replace it.
- **Property Decorators**: Can add metadata or change the behavior of property access.
### Example 1: Method Decorator for simple Logging
Imagine you have a doorbell. When someone presses it, you want a little sign to light up saying "Someone is at the door!" before the door actually opens.
```ts
// This is our "sign-lighting-up" decorator function
function LogWhenCalled(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalDoorbellAction = descriptor.value; // Save the original "open door" action

  // Now, replace the original action with a new one
  descriptor.value = function(...args: any[]) {
    console.log(`The "${methodName}" doorbell was just pressed!`); // Light up the sign
    return originalDoorbellAction.apply(this, args); // Then, do the original "open door" action
  };
}

class House {
  @LogWhenCalled // method decorator for "sign-lighting-up"
  openDoor(visitorName: string) {
    console.log(`Hello, ${visitorName}! Welcome inside.`);
  }
}

const myHouse = new House();
myHouse.openDoor("Muneem"); // Press the doorbell!

// Output:
// The "openDoor" doorbell was just pressed!
// Hello, Muneem! Welcome inside.
```
**How it Works**
* **`openDoor` Method:** This is our normal "doorbell" action. When called, it welcomes a visitor.
* **`LogWhenCalled` Decorator:** This is our "sign-lighting-up" helper. 
    * It takes the `openDoor` method's original action (`originalDoorbellAction`). 
    * It then replaces the `openDoor` method with a new action. 
    * This new action first logs a message (`The "openDoor" doorbell was just pressed!`)
    * Then it runs the `originalDoorbellAction` (the `openDoor` method's original welcome message).
* **`@LogWhenCalled`:** Putting this right above `openDoor` tells TypeScript: "Whenever someone tries to use `openDoor`, don't run the original directly. Instead, run my `LogWhenCalled` helper first, and let it decide what to do."

So, the decorator acts like a little guard that logs a message before the actual method (opening the door) happens.
### Example 2: Property Decorator for Simple Validation 
Imagine you have a "Money Jar" (`balance`). You want to make sure you never put a negative amount of money into it.
```ts
// Property decorator to enforce non-negative numbers
function NonNegative(target: any, propertyKey: string) {
  let value: number;
  const getter = () => value;
  const setter = (newVal: number) => {
    if (newVal < 0) throw new Error("Value cannot be negative");
    value = newVal;
  };
  Object.defineProperty(target, propertyKey, { get: getter, set: setter });
}

class BankAccount {
  @NonNegative
  balance: number = 0;
}

const account = new BankAccount();
account.balance = 100; // OK
// account.balance = -50; // Error: "Value cannot be negative"
```
**How It Works**
* A **property decorator** named `NonNegative`.
* It takes `target` (the prototype of the class) and `propertyKey` (the name of the decorated property) as arguments.
* Inside the decorator, a local variable `value` is used to store the actual property value.
* `Object.defineProperty(target, propertyKey, { get: getter, set: setter });` redefines the property using a custom **getter** and **setter**.
* The **getter** simply returns the stored `value`.
* The **setter** intercepts assignments to the property: if `newVal` is less than 0, it throws an `Error`; otherwise, it assigns `newVal` to `value`.
* `@NonNegative` applies the `NonNegative` decorator to the `balance` property within the `BankAccount` class.
* `class BankAccount { balance: number = 0; }` defines the `BankAccount` class with a `balance` property.
* `const account = new BankAccount();` creates an instance `account` of `BankAccount`.
* `account.balance = 100;` successfully sets the balance to 100 as it's a non-negative value.
* `account.balance = -50;` is a commented-out line that would throw an error if executed, as the setter would prevent assigning a negative value.
::: details Better to know {open}
Getters and setters (when defined within a class) are called accessors, and TypeScript has a specific type of decorator called an Accessor Decorator that targets them.\
An **Accessor Decorator** is applied directly to a `get` or `set` method you define within your class.\
[More on Decorators](https://mirone.me/a-complete-guide-to-typescript-decorator/)
:::
::: tip Analogy
Method decorators are like having a security camera installed at the door of a shop that records every entry and exit (logs calls and results). Property decorators, on the other hand, work like a lock on a safe. Once the safe’s value is set, it cannot be altered.
:::

## Parameter Decorators
Parameter decorators are used to add metadata or modify behavior for individual parameters within a method. They observe or log parameters passed to a method. They don’t modify behavior directly but are used for metadata (e.g., validation, logging).They receive three parameters:
- The target (either the prototype of the class for instance methods, or the constructor for static methods)
- The method name
- The index of the parameter in the method’s arguments list

They are primarily used for metadata and dependency injection rather than altering parameter values.
### Example 1: Logging Parameter Index
```ts
// Parameter decorator to log the parameter index
function LogParameter(target: any, methodName: string, parameterIndex: number) {
  console.log(`Parameter ${parameterIndex} in method ${methodName}`);
}

class Greeter {
  greet(@LogParameter name: string, @LogParameter age: number) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
  }
}

// Output when the class is loaded:
// "Parameter 0 in method greet"
// "Parameter 1 in method greet"

const greeter = new Greeter();
greeter.greet("Muneem", 30); 
// Output: "Hello, Muneem! You are 30 years old."
```
**How it Works**
* `function LogParameter(...)}` defines a **parameter decorator** named `LogParameter`.
* It takes `target` (the prototype of the class), `methodName` (the name of the method the parameter belongs to), and `parameterIndex` (the zero-based index of the parameter) as arguments.
* `@LogParameter` applies the `LogParameter` decorator to the `name` and `age` parameters in the `greet` method of the `Greeter` class.
* `class Greeter { ... }` defines the `Greeter` class with a `greet` method.
* When the `Greeter` class is defined, the `LogParameter` decorator runs for each decorated parameter, causing the initial console output.
* `const greeter = new Greeter();` creates an instance `greeter` of the `Greeter` class.
* `greeter.greet("Muneem", 30);` calls the `greet` method, which then logs the greeting message to the console.
### Example 2: Using Parameter MetaData
```ts
function required(target: any, propertyKey: string, parameterIndex: number) {
  // Store metadata about required parameters
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

class Service {
  start(@required config: string) {
    return `Service started with config: ${config}`;
  }
}

const service = new Service();
service.start("DefaultConfig"); 
// Output: Service started with config: DefaultConfig
// (Metadata is stored internally and can be used by a framework)
```
**How it Works**
* `function required(...)` defines a **parameter decorator** named `required`.
* This decorator aims to mark a parameter as required by storing its index as metadata.
* `Reflect.getOwnMetadata("required", target, propertyKey)` attempts to retrieve existing metadata associated with the method's required parameters.
* `existingRequiredParameters.push(parameterIndex);` adds the current parameter's index to the list of required parameters.
* `Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);` stores the updated list of required parameter indices as metadata on the method.
* `@required` applies the `required` decorator to the `config` parameter in the `start` method of the `Service` class.
* `class Service { ... }` defines the `Service` class with a `start` method.
* `const service = new Service();` creates an instance `service` of the `Service` class.
* `service.start("DefaultConfig");` calls the `start` method with a string argument.
* While the decorator itself doesn't enforce the "required" aspect at runtime in this example, it demonstrates how metadata can be attached to parameters for use by frameworks or custom validation logic elsewhere in the application.
::: tip Analogy
Parameter decorators are like putting a “special handling” sticker on a package. The sticker doesn’t change the contents, but it tells the delivery system that this package has special requirements (such as being fragile or urgent) that may affect how it is processed.
:::

::: info First in mighty Decorators ?
**Decorators are foundational to Angular and NestJS.** Both frameworks heavily leverage decorators (`@Component`, `@Injectable`, `@Module`, `@Controller`, `@Get`, etc.) as a declarative way to configure components, manage dependency injection, define routes, and structure applications. They are essential for understanding how these frameworks work and for building applications within their ecosystems.
:::
::: danger TypeScript Decorators: Current Status and Usage
**Decorators in TypeScript are currently an experimental feature** that aligns with a Stage 3 (near-final) proposal for JavaScript (ECMAScript). While not yet a finalized part of the core JavaScript standard, TypeScript has supported them for a long time, making them **standalone and frequently used** in popular frameworks like Angular and NestJS.

**Regarding executability in online editors:** The examples require the `experimentalDecorators` flag to be enabled in your TypeScript configuration (usually in `tsconfig.json`). Most simple online TypeScript editors or sandboxes don't have this flag enabled by default, which is why the decorator examples won't run without specific setup.
:::

## Summary Table: Types of Decorators in TypeScript

| Decorator Type     | Target                         | Arguments Received                                | What it Can Do                                        | Common Use Cases                                      |
|--------------------|--------------------------------|---------------------------------------------------|-------------------------------------------------------|-------------------------------------------------------|
| **Class Decorator**| The class constructor itself.  | `constructor: Function`                           | Modify, replace, or extend the entire class definition. | Framework configuration (`@Component`, `@Module`), adding metadata to the class, sealing a class, dependency injection setup. |
| **Method Decorator**| A method within a class.       | `target: Object`, `propertyKey: string`, `descriptor: PropertyDescriptor` | Observe, modify, or replace the method's behavior.    | Logging method calls (`@LogMethod`), performance monitoring, authorization checks, debouncing/throttling. |
| **Property Decorator**| A property within a class.     | `target: Object`, `propertyKey: string`           | Observe property declaration, or replace accessors (get/set) to control read/write behavior. | Validation (`@NonNegative`), setting default values, metadata annotation (e.g., for serialization), linking property to UI. |
| **Accessor Decorator**| A `get` or `set` accessor.     | `target: Object`, `propertyKey: string`, `descriptor: PropertyDescriptor` | Observe or modify the behavior of a specific getter or setter. | Auditing property access, custom serialization/deserialization for a specific accessor, fine-grained control over property access. |
| **Parameter Decorator**| A parameter of a method or constructor. | `target: Object`, `methodName: string`, `parameterIndex: number` | Observe and add metadata to a specific parameter. Cannot change the parameter's value or behavior directly. | Dependency injection (marking parameters for injection), validation metadata (e.g., `@MinLength` for a string parameter), API documentation (e.g., `@Body` for request body parameters). |