import { AlertColor, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material"
import type { Patient, Toast } from "../../types";
import { useState } from "react"

import patientServices from "../../services/patients";
import Notification from "./Notification";

interface propTypes {
  patientId: string,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const EntryForm = ({patientId, setPatient}: propTypes) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [hcRating, setHcRating] = useState("")
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [toast, setToast] = useState<Toast>({
    type: undefined,
    message: ''
  });

  const submitNewEntry = async () => {
    const newEntry = {
      patientId,
      type: "Hospital",
      date: parseDate(date),
      description: description,
      specialist: specialist,
      healthCheckRating: parseHcRating(hcRating),
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
    
    try {
      setPatient(await patientServices.createEntry(newEntry));
      setDate("");
      setDescription("");
      setSpecialist("");
      setHcRating("");
      setDiagnosisCodes("");
    } catch (error) {
      if (error instanceof Error) {
        showNotification('error', `Error: ${error.message}`);
      }
    }
  };

  const showNotification = (type:AlertColor, message:string):void => {
    setToast({ type, message });

    setTimeout(() => {
      setToast({
        type: undefined,
        message: ''
      })
    }, 5000);
  };

  const parseHcRating = (hcRating: string):string => {
    if (!/^[0-3]$/.test(hcRating)) {
      showNotification('error', `invalid healthcheck rating: ${hcRating}`);
      throw new Error (`invalid healthcheck rating: ${hcRating}`);
    }
    return hcRating;
  };

  const parseDate = (date: string):string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      showNotification('error', `invalid date set: ${date}`);
      throw new Error (`invalid date set: ${date}`);
    }
    return parsedDate.toISOString();
  };

  const parseDiagnosisCodes = (codes: string): string[] => {
    return codes
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);
  };

  return (
    <>
    <Card sx={{ marginTop: "1rem"}}>
      <CardContent>
        <Box component="form">
          <Typography sx={{ fontWeight: "bold" }}>New HealthCheck Entry</Typography>
          {toast.message && (<Notification toast={toast} />)}
          <div>
            <TextField required fullWidth id="date" label="Date" value={date} margin="dense" onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <TextField required fullWidth id="description" label="Description" value={description} margin="dense" onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <TextField required fullWidth id="specialist" label="Specialist" value={specialist} margin="dense" onChange={e => setSpecialist(e.target.value)} />
          </div>
          <div>
            <TextField required fullWidth id="healthcheckrating" label="Health Check Rating (0-3)" value={hcRating} margin="dense" onChange={e => setHcRating(e.target.value)} />
          </div>
          <div>
            <TextField required fullWidth id="diagnosiscodes" label="Diagnosis Codes (comma-separated)" value={diagnosisCodes} margin="dense" onChange={e => setDiagnosisCodes(e.target.value)} />
          </div>
          <Button variant="contained" sx={{marginRight: "0.5rem", marginTop: "0.5rem"}} onClick={submitNewEntry}>Add</Button>
          <Button variant="outlined" sx={{marginRight: "0.5rem", marginTop: "0.5rem"}}>Cancel</Button>
        </Box>
      </CardContent>
    </Card>
    </>
  )
}

export default EntryForm