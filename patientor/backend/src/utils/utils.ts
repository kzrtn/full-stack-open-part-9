import { type NewEntry, NewPatientSchema, type NewPatient, BaseEntrySchema, HospitalEntrySchema, HealthCheckEntrySchema, OccupationalHealthcareEntrySchema } from '../types.ts';

export const parseNewPatient = (patient: unknown):NewPatient => {
  return NewPatientSchema.parse(patient);
}

export const parseNewEntry = (entry: unknown):NewEntry => {
  if (!entry) throw new Error(`entry does not contain a type!`);
  switch (entry.type) {
    case "HealthCheck":
      return HealthCheckEntrySchema.parse(entry);
    case "OccupationalHealthcare":
      return OccupationalHealthcareEntrySchema.parse(entry);
    case "Hospital":
      return HospitalEntrySchema.parse(entry);
    default:
      throw new Error(`entry does not contain a type!`);
}