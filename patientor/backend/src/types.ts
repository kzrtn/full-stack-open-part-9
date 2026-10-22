export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
};