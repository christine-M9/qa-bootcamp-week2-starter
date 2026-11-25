// Union Types: a value can be one of several types.
function kgToLbs(weight: number | string): number {
  // Narrowing: check the type before using it.
  if (typeof weight === 'number') {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2.2;
  }
}

console.log(kgToLbs(10));
console.log(kgToLbs('10kg'));

// Makes this file its own module so names here do not clash with other files.
export {};
