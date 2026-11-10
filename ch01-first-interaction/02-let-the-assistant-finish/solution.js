// Lesson 1-2 solution (JavaScript): let the assistant finish a small function.

function add(a, b) {
  return a + b;
}

function isEven(n) {
  // The number is even when dividing it by two leaves no remainder.
  return n % 2 === 0;
}

console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`4 is ${isEven(4) ? 'even' : 'odd'}`);
console.log(`7 is ${isEven(7) ? 'even' : 'odd'}`);
