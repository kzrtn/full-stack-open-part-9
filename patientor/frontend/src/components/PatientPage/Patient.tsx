import { useState } from "react";
import axios from 'axios';
import type { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from "./Entry";

const PatientDetails = ({ patientId }: { patientId: string | undefined}) => {
  const [patient, setPatient] = useState<Patient | null>(null)

  if (patientId && !patient) {
    axios.get(`${apiBaseUrl}/patients/${patientId}`).then(res => {
      setPatient(res.data)
      console.log(res.data)
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
        <Typography sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>entries</Typography>
        {patient.entries.map(entry => (
          <Entry entry={entry} key={entry.id} />
        ))}
      </div>
    );
  
  return (
    <div>loading...</div>
  );
};

export default PatientDetails;
