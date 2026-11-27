// Tuples: a fixed length array where each position has its own type.
let user: [number, string] = [1, 'Mosh'];

console.log(user[0]); // the number
console.log(user[1].toUpperCase()); // the string, so string methods work

// A tuple can hold more than two values, as long as each position has a fixed type,
// for example [id, name, isActive].
let product: [string, number] = ['Hammer', 12.58];
console.log(`${product[0]} costs ${product[1]}`);

// Makes this file its own module so names here do not clash with other files.
export {};
