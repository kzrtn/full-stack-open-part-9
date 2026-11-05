import express from 'express';
import { z } from 'zod';
import { allPatients, getOne } from '../services/patientsServices.ts';
import { parseNewEntry, parseNewPatient } from '../utils/utils.ts';
const patientsRouter = express.Router();
const allPatientsData = allPatients();

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

patientsRouter.get('/patients', (_req, res) => {
  res.json(allPatientsData);
});

patientsRouter.get('/patients/:id', (req, res) => {
  const patient = getOne(req.params.id);
  res.json(patient);
});

interface patientRequest {
  body: {
    name: string,
    occupation: string,
    gender: string,
    ssn: string,
    dateOfBirth: string
  }
}

patientsRouter.post('/patients', (req:patientRequest, res) => {
  try {
    const {name, occupation, gender, ssn, dateOfBirth} = (req.body);
    const newPatient = {
      id: crypto.randomUUID().toString(),
      entries: [],
      ...parseNewPatient({
        name,
        occupation,
        gender,
        ssn,
        dateOfBirth,
      })
    };
    allPatientsData.push(newPatient);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' }); 
    }
  }
});

patientsRouter.post('/patients/:id/entries', (req, res) => {
  const patient = getOne(req.params.id);
  if (!patient) throw new Error(`Patient with id ${req.params.id} does not exist.`);
  try {
    const newEntry = {
      id: crypto.randomUUID().toString(),
      ...parseNewEntry({
        ...req.body
      })
    };
    res.json(newEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' }); 
    }
  }
});

export default patientsRouter;