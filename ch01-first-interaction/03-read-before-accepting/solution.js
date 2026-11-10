// Lesson 1-3 solution (JavaScript): read before you accept.

function isPrime(n) {
  // Check whether any number from 2 up to the square root divides n.
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

for (const n of [1, 2, 9, 11]) {
  console.log(`${n} -> ${isPrime(n) ? 'prime' : 'not prime'}`);
}
