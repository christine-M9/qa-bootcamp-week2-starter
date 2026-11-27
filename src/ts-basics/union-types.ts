// Union Types: a value can be one of several types.
function kgToLbs(weight: number | string): number {
  // Narrowing: check the type before using it.
  if (typeof weight === 'number') {
    return weight * 2.2;
  } else {
    // parseFloat keeps the decimals. parseInt would turn '10.5kg' into 10.
    return parseFloat(weight) * 2.2;
  }
}

console.log(kgToLbs(10));
console.log(kgToLbs('10kg'));
console.log(kgToLbs('10.5kg'));

// Makes this file its own module so names here do not clash with other files.
export {};
