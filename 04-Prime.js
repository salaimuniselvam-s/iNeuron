function primeNo(lower, higher) {
  for (let i = lower; i <= higher; i++) {
    let b = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j == 0) {
        b = b + 1;
      }
    }
    if (b == 2) {
      console.log(i);
    }
  }
}
primeNo(0, 10);
