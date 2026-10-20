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

interface Values {
  height: number,
  weight: number
}

const processArgv = (args: string[]): Values => {
  if (args.length > 4) throw new Error("Too many arguments.");
  if (args.length < 4) throw new Error("Not enough arguments.");
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error("One of the arguments is not a number");
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  }
}

try {
  const {height, weight} = processArgv(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage: string = "Error occurred. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage)
}