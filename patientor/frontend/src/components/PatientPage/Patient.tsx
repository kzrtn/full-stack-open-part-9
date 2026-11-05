import { useState } from "react";
import axios from 'axios';
import type { Diagnosis, Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from "./Entry";
import EntryForm from "./EntryForm";

const PatientDetails = ({ patientId, diagnoses }: { patientId: string | undefined, diagnoses: Diagnosis[]}) => {
  const [patient, setPatient] = useState<Patient | null>(null)

  if (patientId && !patient) {
    axios.get(`${apiBaseUrl}/patients/${patientId}`).then(res => {
      setPatient(res.data);
    });
  }

  if (patient)
    return (
      <div>
        <Typography variant="h5" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
          {patient.name}
          {patient.gender === 'male' ? (<MaleIcon />) : (<FemaleIcon />)}
        </Typography>
        <div><Typography>ssn: {patient.ssn}</Typography></div>
        <div><Typography>occupation: {patient.occupation}</Typography></div>
        <div><Typography>date of birth: {patient.dateOfBirth}</Typography></div>
        {patientId && <EntryForm patientId={patientId} patient={patient} setPatient={setPatient} diagnoses={diagnoses} />}
        <Typography sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>entries</Typography>
        {patient.entries.map(entry => (
          <Entry entry={entry} key={entry.id} diagnoses={diagnoses} />
        ))}
      </div>
    );
  
  return (
    <div>loading...</div>
  );
};

export default PatientDetails;
