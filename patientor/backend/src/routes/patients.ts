import express from 'express';
import { z } from 'zod';
import { allPatients, getOne } from '../services/patientsServices.ts';
import { parseNewPatient } from '../utils/utils.ts';
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
})

patientsRouter.post('/patients', (req, res) => {
  try {
    const {name, occupation, gender, ssn, dateOfBirth} = req.body;
    const newPatient = {
      id: Math.random().toString(),
      ...parseNewPatient({
        name,
        occupation,
        gender,
        ssn,
        dateOfBirth
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

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

patientsRouter.post('/patients/:id/entries', (req, res) => {
  const patient = getOne(req.params.id);
  try {
    const {description, date, specialist, diagnosisCodes, type} = req.body;
    const newEntry = {
      id: Math.random().toString(),
      
    }
    
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' }); 
    }
  }
});

export default patientsRouter;