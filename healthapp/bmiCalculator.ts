const calculateBmi = (heightInCm: number, weightInKg: number):string => {
  const bmi: number = weightInKg / (heightInCm ** 2) * 10000;
  if (bmi < 18.5) {
    return `Underweight range`;
  } else if (bmi < 22.9 && bmi > 18.5) {
    return "Normal range"
  } else if (bmi < 27.4 && bmi > 23.0) {
    return "Overweight range"
  } else {
    return "Obese range"
  }
}

console.log(calculateBmi(180, 74))