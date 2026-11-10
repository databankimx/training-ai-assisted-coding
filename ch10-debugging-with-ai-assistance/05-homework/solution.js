// Homework solution (JavaScript): every rating is added, and the count is the number of ratings.

function average(ratings) {
  let total = 0;
  for (const rating of ratings) {
    total += rating;
  }
  return total / ratings.length;
}

function check(ratings, expected) {
  const actual = average(ratings);
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`ratings ${ratings.join(",")}: ${actual} ${status}`);
}

check([4, 5, 3, 2], 3.5);
check([5, 5], 5);
check([2, 4, 6], 4);
