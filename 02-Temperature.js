const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32 + "°F";

const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9 + "°C";

console.log(`60°C -----> ` + celsiusToFahrenheit(60)); // 59
console.log(`45°F -----> ` + fahrenheitToCelsius(45));
