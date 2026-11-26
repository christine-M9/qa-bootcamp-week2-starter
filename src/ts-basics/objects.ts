// Objects: describe the shape of an object inline.
// readonly stops id being changed. name? is optional (it may be missing).
let employee: {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: 'Mosh',
  retire: (date: Date) => {
    console.log(`Retiring on ${date.toDateString()}`);
  },
};

console.log(employee.id, employee.name);
// Months start at 0 in JavaScript, so 0 is January.
employee.retire(new Date(2030, 0, 1));

// employee.id = 2; // error: cannot assign to id because it is readonly

// Makes this file its own module so names here do not clash with other files.
export {};
