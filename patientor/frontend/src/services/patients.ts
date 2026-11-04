import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (entry:any) => {
  const { patientId } = entry;
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );

  return data;
}

export default {
  getAll, create, createEntry
};

