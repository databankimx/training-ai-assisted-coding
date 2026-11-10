// Homework solution (JavaScript): three small functions, checked with examples.

function max3(a, b, c) {
  return Math.max(a, b, c);
}

function isPalindrome(text) {
  const cleaned = text.toLowerCase();
  return cleaned === [...cleaned].reverse().join('');
}

function countVowels(text) {
  let count = 0;
  for (const letter of text.toLowerCase()) {
    if ('aeiou'.includes(letter)) {
      count++;
    }
  }
  return count;
}

console.log(`Max3(3, 9, 4) = ${max3(3, 9, 4)}`);
console.log(`Max3(-1, -5, -2) = ${max3(-1, -5, -2)}`);
console.log(`IsPalindrome(level): ${isPalindrome('level') ? 'yes' : 'no'}`);
console.log(`IsPalindrome(Hello): ${isPalindrome('Hello') ? 'yes' : 'no'}`);
console.log(`IsPalindrome(empty): ${isPalindrome('') ? 'yes' : 'no'}`);
console.log(`CountVowels(AI coding) = ${countVowels('AI coding')}`);
console.log(`CountVowels(rhythm) = ${countVowels('rhythm')}`);
