function multiples(number) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(`Sum of Multiples of 3 & 5 in 1000 is - ${multiples(1000)}`);
