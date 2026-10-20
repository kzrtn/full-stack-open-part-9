interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

//const dailyExerciseHours: number[] = [3, 0, 2, 4.5, 0, 3, 1];

interface inputValues {
  target: number;
  exerciseHours: number[];
}

const processArgs = (args: string[]):inputValues => {
  if (args.length < 3) throw new Error("Not enough arguments.");
  if (args.length > 17) throw new Error("Too many arguments.");

  let cleanedArgs: number[] = [];
  let target: number = 0;
  for (let i = 2; i < args.length; i++) {
    if(isNaN(Number(args[i]))) throw new Error("One of the arguments is not a number.")
    if(i > 2) {
      cleanedArgs.push(Number(args[i]));
    } else {
      target = Number(args[i]);
    }
  }
  return {
    target,
    exerciseHours: cleanedArgs
  }
}

const calculateExercise = (target: number, exerciseHours: number[]): exerciseResults => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(el => el > 0).length;
  const average: number = exerciseHours.reduce((accumulator: number, current: number) => accumulator + current, 0) / periodLength;
  const success: boolean = average > target;
  let rating: number;
  let ratingDescription: string;
  
  if (average > target + 1) {
    rating = 3;
    ratingDescription = "Outstanding! You've beat your target by a wide margin!"
  } else if (average >= target && average < target + 1) {
    rating = 2;
    ratingDescription = "Good job, you've hit your target!";
  } else {
    rating = 1;
    ratingDescription = "You didn't hit your target, better luck next time."
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  }
}

try {
  const {target, exerciseHours} = processArgs(process.argv);
  console.log(calculateExercise(target, exerciseHours));
} catch (error: unknown) {
  let errorMessage: string = "Error occurred. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage)
}