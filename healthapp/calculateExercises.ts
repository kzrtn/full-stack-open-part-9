interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const dailyExerciseHours: number[] = [3, 0, 2, 4.5, 0, 3, 1] ;

const calculateExercise = (exerciseHours: number[], target: number): exerciseResults => {
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

console.log(calculateExercise(dailyExerciseHours, 2))