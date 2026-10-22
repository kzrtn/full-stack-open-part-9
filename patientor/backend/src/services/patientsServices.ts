import data from '../../data/patients.ts';
import { type NonSensitivePatient } from '../types.ts';

export const allPatients = (): NonSensitivePatient[] => {
  const omittedData = data.map(({id, name, occupation, gender, dateOfBirth}) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
  
  return omittedData as NonSensitivePatient[];
};