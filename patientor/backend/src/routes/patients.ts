import express from 'express';
import { allPatients } from '../services/patientsServices.ts';
const patientsRouter = express.Router();
const allPatientsData = allPatients();

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

patientsRouter.get('/patients', (_req, res) => {
  res.json(allPatientsData);
});

patientsRouter.post('/patients', (req, res) => {
  const {name, occupation, gender, ssn, dateOfBirth} = req.body;
  const newPatient = {
    id: crypto.randomUUID(),
    name,
    occupation,
    gender,
    ssn,
    dateOfBirth
  };
  allPatientsData.push(newPatient);
  res.json(newPatient);
});

export default patientsRouter;