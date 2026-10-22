import data from '../../data/diagnoses.ts';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export const allDiagnoses = (): Diagnosis[] => {
  return data;
};