import { Gender, type NewPatient } from '../types.ts';

export const parseNewPatient = (patient: unknown):NewPatient => {
  if (typeof patient !== 'object' || !patient) {
    throw new Error('Incorrect or missing data');
  }

  if (!('name' in patient && 'occupation' in patient && 'gender' in patient)) {
    throw new Error('Incorrect or missing fields from patient data');
  }

  const newPatient:NewPatient = {
    name: parseName(patient.name),
    occupation: parseOccupation(patient.occupation),
    gender: parseGender(patient.gender),
  }

  if ('ssn' in patient && patient.ssn !== undefined) {
    newPatient.ssn = parseSsn(patient.ssn);
  }

  if ('dateOfBirth' in patient && patient.dateOfBirth !== undefined) {
    newPatient.dateOfBirth = parseDateOfBirth(patient.dateOfBirth);
  }

  return newPatient;
}

const parseName = (name: unknown):string => {
  if (!isString(name) || !name) {
    throw new Error('Name is of incorrect type or missing');
  }
  return name;
};

const parseOccupation = (occupation: unknown):string => {
  if (!isString(occupation) || !occupation) {
    throw new Error('Occupation is of incorrect type or missing');
  }
  return occupation;
}

const parseSsn = (ssn: unknown):string => {
  if(!isString(ssn) || !ssn) {
    throw new Error('SSN is of incorrect type or missing');
  }
  if(isNaN(Number(ssn))) {
    throw new Error('SSN is not a number');
  }
  return ssn;
}

const parseGender = (gender: unknown):Gender => {
  if(!isString(gender) || !isGender(gender) || !gender) {
    throw new Error('Gender is of incorrect type or missing');
  }
  return gender;
}

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
}

const parseDateOfBirth = (dateOfBirth: unknown):string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth) || !dateOfBirth) {
    throw new Error('Occupation is of incorrect type or missing');
  }
  return dateOfBirth;
}

const isDate = (someDate:string):Boolean => {
  return Boolean(Date.parse(someDate));
}

const isString = (s: unknown): s is string => {
  return typeof s === 'string' || s instanceof String;
};