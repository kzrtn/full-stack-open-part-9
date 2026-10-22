import data from '../../data/patients.ts';

interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
};

export const allPatients = (): NonSensitivePatient[] => {
  const omittedData = data.map(({id, name, occupation, gender, dateOfBirth}) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
  
  return omittedData as NonSensitivePatient[]
}