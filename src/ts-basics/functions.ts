// Functions: type the parameters and the return value.
// taxYear has a default value, so it is optional when calling.
function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear < 2022) {
    return income * 1.2;
  }
  return income * 1.3;
}

console.log(calculateTax(10_000));
console.log(calculateTax(10_000, 2021));

// Makes this file its own module so names here do not clash with other files.
export {};
