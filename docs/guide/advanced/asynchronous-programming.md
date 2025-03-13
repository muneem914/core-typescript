---
outline: deep
---

# Asynchronous Programming

Asynchronous programming in TypeScript addresses the challenge of managing operations that don't complete instantly. It is a way to handle operations that **takes time to complete**, like fetching data from an API, reading files, or waiting for user input. Which ensures that a program does not freeze while waiting for a task to finish.

In modern applications, tasks like network requests, file system interactions, or complex computations can take significant time.  
To prevent these operations from blocking the main thread which causes a frozen user interface, asynchronous techniques are employed.

TypeScript builds upon JavaScript's asynchronous foundation, notably Promises and the `async/await` syntax, and strengthens it with static typing. This combination allows developers to write code that performs long-running tasks in the background, ensuring the application remains responsive.

By using Promises, developers can represent the eventual completion (or failure) of an asynchronous operation, and `async/await` provides a more readable and synchronous-looking syntax for working with Promises.

This ensures that the application can continue processing other tasks while waiting for the asynchronous operation to finish, leading to a smoother and more efficient user experience. Crucially, TypeScript's type system ensures that the data returned from asynchronous functions is correctly typed, reducing the risk of runtime errors and improving code maintainability.

::: tip Analogy
Imagine going to a restaurant and ordering food:

1. You place an order (**request**).
2. The chef starts cooking (**processing**).
3. While waiting, you can do other things (like talking, checking your phone).
4. When the food is ready, the waiter brings it to you (**response**).

If the restaurant worked **synchronously**, you'd have to **wait at the counter** doing nothing until the food was ready.  
Whereas, **_asynchronous programming allows the program to keep working_** while waiting for the task to finish. (like you were talking, checking your phone while they are making you order)
:::

## Promises in TypeScript

A `Promise` represents an asynchronous operation that will eventually complete (**resolve**) or fail (**reject**). It basically represents an operation that hasn't completed yet but will be completed in the future.

It has three states:

- **Pending**: Initial state (operation not completed / still processing).
- **Fulfilled**: Operation succeeded (result is available).
- **Rejected**: Operation failed (with an error).

### Basic Example of a Promise

```ts
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received successfully!");
    }, 2000);
  });
};

fetchData().then((response) => console.log(response));
```

#### How it works

- `fetchData` is an asynchronous function that returns a `Promise<string>`.
- `new Promise` used to create a Promise.
- Inside the promise, `setTimeout` simulates a 2-second delay.
- After 2 seconds, `resolve("Data received successfully!")` runs, completing the Promise.
- `fetchData().then(response => console.log(response));`
  - `then()` executes when the promise is resolved.
  - It prints `"Data received successfully!"`.

### Handling Errors with `catch()`

```ts
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() > 0.5; // 50% chance of failure
      if (success) {
        resolve("Data received successfully!");
      } else {
        reject("Error fetching data!");
      }
    }, 2000);
  });
};

fetchData()
  .then((response) => console.log(response))
  .catch((error) => console.log("Error:", error));
```

#### How it works

- Random success or failure (`Math.random() > 0.5`).
- If successful, it resolves with `"Data received successfully!"`.
- If it fails, it rejects with `"Error fetching data!"`.
- `.catch()` handles the error and logs `"Error: <error message>"`.

## Async / Await in TypeScript

`async/await` is a modern way to handle Promises that makes the code look synchronous but still runs asynchronously. The `async` keyword designates a function as asynchronous, which returns a Promise and allows the use of `await` within it. `await` pauses execution until a Promise resolves, it returns resolved value and makes asynchronous code resemble synchronous code.

This approach enhances readability and maintainability by eliminating complex Promise chaining, which makes it easier to manage long-running operations without blocking the main thread.

::: tip Analogy
Imagine you went on a pizza shop and ordered a pizza.

- You are waiting for your pizza at the restaurant table.
- The Chef prepares it (asynchronously).
- Instead of checking your phone or repeatedly asking the staff if it's ready, you stay seated (`await`) until the pizza arrives (**resolved**).
  (_or the waiter tells you there's a problem(**rejected**)_)
- Once it's ready, you **pick it up** and leave.
  :::

### Converting a Promise to Async/Await

```ts
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received successfully!");
    }, 2000);
  });
};

async function getData() {
  console.log("Fetching data...");
  const response = await fetchData(); // Wait until promise resolves
  console.log(response);
}

getData();
```

#### How it works

- The `fetchData()` function returns a Promise.
- The `getData()` function is marked as `async`, meaning it can use `await`.
- `await fetchData()`; pauses execution until the Promise resolves.
- This approach makes the code easier to read and avoids `.then()` chaining.

### Handling Errors in Async/Await

```ts
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() > 0.5;
      if (success) {
        resolve("Data received successfully!");
      } else {
        reject("Error fetching data!");
      }
    }, 2000);
  });
};

async function getData() {
  try {
    console.log("Fetching data...");
    const response = await fetchData();
    console.log(response);
  } catch (error) {
    console.log("Error:", error);
  }
}

getData();
```

#### How it works

- `fetchData` returns a `Promise<string>` that resolves or rejects randomly after 2 seconds.
- `Math.random() > 0.5` simulates a random success or failure.
- `getData` is an `async` function that fetches data using `fetchData`.
- `try...catch` handles potential rejections from the promise.
- If `fetchData` resolves, the resolved string is logged.
- If `fetchData` rejects, the error message is logged.

### Advanced Async/Await

**Fetching Multiple Data in Parallel with `Promise.all`**

Imagine ordering multiple pizzas at the same time. Instead of waiting for one by one, you wait for all to be ready.

```ts
const fetchUser = (): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
};

const fetchOrders = (): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Order Data"), 3000)
  );
};

async function fetchAllData() {
  console.log("Fetching user and orders...");

  const [user, orders] = await Promise.all([fetchUser(), fetchOrders()]);

  console.log("User:", user);
  console.log("Orders:", orders);
}
fetchAllData();
```

#### How it works

- `fetchUser` and `fetchOrders` are asynchronous functions returns `Promise<string>`, which simulates data fetching with timeouts (`setTimeout`).
- `fetchAllData` is an `async` function that fetches user and order data concurrently.
- `Promise.all([fetchUser(), fetchOrders()])` executes both promises in parallel.
- `await` waits for both promises to resolve, destructuring the results into `user` and `orders`.
- The resolved data is then logged to the console.

### Generics with Typed Promises

What if we want a function that can return **any type of data**, not just a string?  
We can use Generics (`T`) to make it flexible.

```ts
const fetchData = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

async function getGenericData() {
  const user = await fetchData<string>("John Doe");
  console.log("User:", user);

  const age = await fetchData<number>(30);
  console.log("Age:", age);
}

getGenericData();
```

#### How it works

- `fetchData<T>(data: T): Promise<T>` is a generic function.
- It takes a data parameter of type `T` and returns a Promise of type `T`.
- We call `fetchData<string>("John Doe")` to return a string.
- We call `fetchData<number>(30)` to return a number.

## Summary

| Concept/Feature              | Description                                                                                                                   | Analogy                        | Benefit                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| **Promises**                 | Objects representing the eventual completion (or failure) of an asynchronous operation. States: pending, fulfilled, rejected. | Pizza order receipt            | Handle asynchronous operations and errors using `.then()` and `.catch()`.           |
| **Async/Await**              | Syntactic sugar for working with Promises, allowing asynchronous code to look like synchronous code.                          | Waiting at the table for pizza | Simplifies Promise-based code; improves readability and maintainability.            |
| **Typed Promises**           | Promises with explicitly defined resolved value types (e.g., `Promise<string>`).                                              | Ordering a specific pizza      | Enforces type safety on resolved Promise values, reducing runtime errors.           |
