import data from '../../data/patients.ts';

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
};

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
};

export const allPatients = (): Patient[] => {
  return data as Patient[]
}