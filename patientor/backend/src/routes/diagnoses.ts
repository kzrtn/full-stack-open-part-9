import express from 'express';
import { allDiagnoses } from '../services/diagnosesServices.ts';
const diagnosesRouter = express.Router();

diagnosesRouter.get('/diagnoses', (_req, res) => {
  const allDiagnosesData = allDiagnoses();
  res.json(allDiagnosesData);
});

export default diagnosesRouter;