// Optional Chaining: safely read a value that might be missing.
type Customer = {
  birthday?: Date; // optional property on a type alias
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
// ?. stops and returns undefined instead of crashing when customer is null.
console.log(customer?.birthday);

customer = getCustomer(1);
console.log(customer?.birthday?.getFullYear());

// Optional element access and optional call
let customers: Customer[] | null = null;
console.log(customers?.[0]);

let log = null as ((message: string) => void) | null;
log?.('a'); // does nothing, no crash

// Makes this file its own module so names here do not clash with other files.
export {};
