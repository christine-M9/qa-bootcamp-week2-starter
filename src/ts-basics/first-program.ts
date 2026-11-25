// Your First TypeScript Program
// A variable with a type annotation. TypeScript checks that age is always a number.
let age: number = 20;

if (age < 50) {
  age += 10;
}

console.log(age);

// Makes this file its own module so names here do not clash with other files.
export {};
