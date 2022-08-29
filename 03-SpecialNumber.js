function factorial(number) {
  if (number == 0) {
    return 1;
  }
  if (number > 0) {
    return number * factorial(number - 1);
  }
}
function SpecialNumber(number) {
  let numberOfDigits = number.toString().length;
  let sum = 0;

  for (i = 0; i < numberOfDigits; i++) {
    // factorial of the given index number & add it to sum
    sum += factorial(number.toString().charAt(i));
  }

  if (sum == number) {
    console.log("The entered number is an Special number.");
  } else {
    console.log("The entered number is not an Special number.");
  }
}
SpecialNumber(145);
SpecialNumber(7);
