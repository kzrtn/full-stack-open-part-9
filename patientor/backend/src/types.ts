import { z } from 'zod';

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export interface Entry {
  name: string;
  description: string;
  date: string;
  specialist: string;
  codes?: string[];
}

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
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type Gender = typeof Gender[keyof typeof Gender];