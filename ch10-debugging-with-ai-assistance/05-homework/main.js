// Homework starter (JavaScript): a rating average with a seeded bug. Run it, debug it, and record each hypothesis.
// Don't change the code until you have a hypothesis you can test.

function average(ratings) {
  let total = 0;
  for (let i = 0; i < ratings.length - 1; i++) {
    total += ratings[i]; // seeded bug: the last rating is never added
  }
  return total / (ratings.length - 1);
}

function check(ratings, expected) {
  const actual = average(ratings);
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`ratings ${ratings.join(",")}: ${actual} ${status}`);
}

check([4, 5, 3, 2], 3.5);
check([5, 5], 5);
check([2, 4, 6], 4);
