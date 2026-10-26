import { z } from 'zod';

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;


export type Gender = typeof Gender[keyof typeof Gender];