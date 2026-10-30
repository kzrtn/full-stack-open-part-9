import data from '../../data/patients.ts';
import { type NonSensitivePatient, type Patient } from '../types.ts';
import { parseNewPatient } from '../utils/utils.ts';

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

export const getOne = (id:string):Patient => {
  const patient = data.find(p => p.id === id);
  if (patient) {
    return {
      ...patient,
      ...parseNewPatient(patient),
      entries: []
    };
  } else {
    throw new Error(`Error: Patient with ID ${id} does not exist in database.`);
  }
}