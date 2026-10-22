import express from 'express';
import { allPatients } from '../services/patientsServices.ts';
const patientsRouter = express.Router();

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

patientsRouter.get('/patients', (_req, res) => {
  const allPatientsData = allPatients();
  res.json(allPatientsData);
});

export default patientsRouter;