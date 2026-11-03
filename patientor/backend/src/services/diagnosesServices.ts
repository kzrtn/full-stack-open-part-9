import data from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

export const allDiagnoses = (): Diagnosis[] => {
  return data;
};