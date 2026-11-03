import { z } from 'zod';
import type { Diagnosis } from './services/diagnosesServices.ts';

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export interface BaseEntry {
  name: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave : {
    startDate: string;
    endDate: string;
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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