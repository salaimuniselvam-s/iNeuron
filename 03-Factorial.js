// Recursion
function Factorial(num) {
  if (num === 0) return 1;
  return num * Factorial(num - 1);
}

console.log(`Factorial of 5 is ` + Factorial(5));
console.log(`Factorial of 7 is ` + Factorial(7));
