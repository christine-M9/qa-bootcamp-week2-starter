// Type Aliases: give an object shape a name so you can reuse it.
type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

let employee: Employee = {
  id: 1,
  name: 'Mosh',
  retire: (date: Date) => {
    console.log(`Retiring on ${date.toDateString()}`);
  },
};

console.log(employee);

// Makes this file its own module so names here do not clash with other files.
export {};
