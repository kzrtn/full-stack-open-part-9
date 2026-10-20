import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  if (!height || !weight) throw new Error('invalid parameter given')
  console.log(height, weight)
  res.send('ok');
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});