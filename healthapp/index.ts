import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)) || !height || !weight)
    throw new Error('invalid parameter given, should be a number');
  
  res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), (Number(weight)))
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});