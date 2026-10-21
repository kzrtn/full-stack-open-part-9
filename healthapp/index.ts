import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercise } from './calculateExercises.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)) || !height || !weight)
    res.status(400).json({
      error: 'malformatted parameters'
    });
  
  res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), (Number(weight)))
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({
      error: "parameters missing"
    });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(item => typeof item !== 'number')) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }

  res.json(calculateExercise(Number(target), daily_exercises as number[]));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});