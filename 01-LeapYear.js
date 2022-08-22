function isLeap(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 == 0) {
        return `${year} is Leap Year`;
      } else {
        return `${year} is Not Leap Year`;
      }
    } else {
      return `${year} is Leap Year`;
    }
  } else {
    return `${year} is Not Leap Year`;
  }
}

console.log(isLeap(2000));
console.log(isLeap(2022));
console.log(isLeap(2012));
