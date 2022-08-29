function ArmstrongNumber(number) {
  let numberOfDigits = number.toString().length;
  let sum = 0;

  for (i = 0; i < numberOfDigits; i++) {
    // cube every number & add it to the sum
    sum += Math.pow(number.toString().charAt(i), 3);
  }

  if (sum == number) {
    console.log("The entered number is an Armstrong number.");
  } else {
    console.log("The entered number is not an Armstrong number.");
  }
}
ArmstrongNumber(153);
ArmstrongNumber(141);
ArmstrongNumber(370);
ArmstrongNumber(22);
ArmstrongNumber(371);
ArmstrongNumber(407);
