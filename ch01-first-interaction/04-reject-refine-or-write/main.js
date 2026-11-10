// Lesson 1-4 starter (JavaScript): reject, refine, or write it yourself.
// The isPrime below came from an earlier suggestion. It's wrong for 1. Find the fault, and fix it.

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

for (const n of [1, 2, 9, 11]) {
  console.log(`${n} -> ${isPrime(n) ? 'prime' : 'not prime'}`);
}
