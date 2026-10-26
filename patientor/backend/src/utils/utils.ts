import { NewPatientSchema, type NewPatient } from '../types.ts';

export const parseNewPatient = (patient: unknown):NewPatient => {
  return NewPatientSchema.parse(patient);
}