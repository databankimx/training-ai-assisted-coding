// Lesson 1-4 solution (JavaScript): reject, refine, or write it yourself.

function isPrime(n) {
  if (n < 2) {
    return false;
  }
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
