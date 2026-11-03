import { useState } from "react";
import axios from 'axios';
import type { Gender, Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientDetails = ({ patientId }: { patientId: string | undefined}) => {
  const [patient, setPatient] = useState<Patient>({
    dateOfBirth: "",
    gender: "male" as Gender,
    id: "",
    name: "",
    occupation: ""
  })

  if (!patientId) {
    return (
      <div>
        loading...
      </div>
    )
  }

  axios.get(`${apiBaseUrl}/patients/${patientId}`).then(res => setPatient(res.data));

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "0.5em", fontWeight: "bold" }}>
        {patient.name}
        {patient.gender === 'male' ? (<MaleIcon />) : (<FemaleIcon />)}
      </Typography>
      <div><Typography>ssn: {patient.ssn}</Typography></div>
      <div><Typography>occupation: {patient.occupation}</Typography></div>
      <div><Typography>date of birth: {patient.dateOfBirth}</Typography></div>
    </div>
  );
};

export default PatientDetails;
