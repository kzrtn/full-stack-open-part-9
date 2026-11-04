import express from 'express';
import { z } from 'zod';
import { allPatients, getOne } from '../services/patientsServices.ts';
import { parseNewEntry, parseNewPatient } from '../utils/utils.ts';
const patientsRouter = express.Router();
let allPatientsData = allPatients();

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
  try {
    const newEntry = {
      id: crypto.randomUUID().toString(),
      ...parseNewEntry({
        ...req.body
      })
    };
    // append new entry to patient entry array
    allPatientsData = allPatientsData.map(p => {
      if(p.id === patient.id) {
        return {
          ...p,
          entries: [
            ...(p.entries ?? []),
            newEntry
          ]
        }
      } else {
        return p
      }
    });
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