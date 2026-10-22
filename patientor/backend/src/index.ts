import express from 'express';
import patientsRouter from './controllers/patients.ts';
const app = express();
app.use(express.json());

app.use('/api', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});