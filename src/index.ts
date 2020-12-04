import c from './some.json';

const c2 = {
  "test": "Hello world!"
} as const;

type TypeC = typeof c;

type TypeC2 = typeof c2;

console.log(c);

export const dummy = 5;