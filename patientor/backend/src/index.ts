import express from 'express';
import patientsRouter from './routes/patients.ts';
import diagnosesRouter from './routes/diagnoses.ts';
const app = express();
app.use(express.json());

app.use('/api', patientsRouter);
app.use('/api', diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});