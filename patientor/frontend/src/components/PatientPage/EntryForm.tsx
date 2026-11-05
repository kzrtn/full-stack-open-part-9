import { AlertColor, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import type { Patient, Toast } from "../../types";
import { useState } from "react"

import patientServices from "../../services/patients";
import Notification from "./Notification";
import MultiSelectChip from "./MultiSelectChip";

interface propTypes {
  patientId: string,
  patient: Patient,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>,
  diagnoses: Array<{
    code: string,
    name: string,
    latin?: string
  }>
}

const EntryForm = ({patientId, patient, setPatient, diagnoses}: propTypes) => {
  const [type, setType] = useState("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [hcRating, setHcRating] = useState("0")
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employer, setEmployer] = useState("");
  const [startSick, setStartSick] = useState("");
  const [endSick, setEndSick] = useState("");

  const [toast, setToast] = useState<Toast>({
    type: undefined,
    message: ''
  });

  const resetForm = () => {
    setType("HealthCheck");
    setDate("");
    setDescription("");
    setSpecialist("");
    setHcRating("");
    setDiagnosisCodes([]);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployer("");
    setStartSick("");
    setEndSick("");
  }

  const submitNewEntry = async () => {
    try {
      const baseEntry = {
        patientId,
        type,
        date: parseDate(date),
        description: description,
        specialist: specialist,
        diagnosisCodes,
      };
      let newEntry;
      switch (type) {
        case "Hospital":
          newEntry = {
            ...baseEntry,
            discharge: {
              date: parseDate(dischargeDate),
              criteria: dischargeCriteria
            }
          };
          break;
        case "HealthCheck":
          newEntry = {
            ...baseEntry,
            healthCheckRating: parseHcRating(hcRating),
          };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            ...baseEntry,
            employerName: employer,
            ...(startSick || endSick
            ? { sickLeave: {
                  startDate: parseDate(startSick),
                  endDate: parseDate(endSick)
                }
              }
            : {})
          };
          break;
        default:
          showNotification('error', `invalid entry type: ${type}`);
          throw new Error(`invalid entry type: ${type}`);
      };
      const returnedEntry = await patientServices.createEntry(newEntry);
      const newPatient = {
        ...patient,
        entries: [
          ...patient.entries,
          returnedEntry,
        ]
      }
      setPatient(newPatient);
      resetForm();
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

  const parseHcRating = (hcRating: string):number => {
    if (!/^[0-3]$/.test(hcRating)) {
      showNotification('error', `invalid healthcheck rating: ${hcRating}`);
      throw new Error (`invalid healthcheck rating: ${hcRating}`);
    }
    return Number(hcRating);
  };

  const parseDate = (date: string):string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      showNotification('error', `invalid date set: ${date}`);
      throw new Error (`invalid date set: ${date}`);
    }
    return date;
  };

  return (
    <>
    <Card sx={{ marginTop: "1rem"}}>
      <CardContent>
        <Box component="form">
          <Typography sx={{ fontWeight: "bold" }}>New Entry</Typography>
          {toast.message && (<Notification toast={toast} />)}
          <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="type">Entry Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label="Entry Type"
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
              <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
              <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div>
            <TextField required fullWidth id="date" type="date" label="Date" value={date} margin="dense" onChange={e => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </div>
          <div>
            <TextField required fullWidth id="description" label="Description" value={description} margin="dense" onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <TextField required fullWidth id="specialist" label="Specialist" value={specialist} margin="dense" onChange={e => setSpecialist(e.target.value)} />
          </div>
          <div>
            <MultiSelectChip diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes} diagnoses={diagnoses}/>
          </div>
          {type === "Hospital" && (
            <>
              <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>Discharge data</Typography>
              <div>
                <TextField required fullWidth type="date" id="discharge-date" label="Discharge Date" value={dischargeDate} margin="dense" onChange={e => setDischargeDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
              </div>
              <div>
                <TextField required fullWidth id="discharge-criteria" label="Discharge Criteria" value={dischargeCriteria} margin="dense" onChange={e => setDischargeCriteria(e.target.value)} />
              </div>
            </>
          )}
          {type === "HealthCheck" && (
            <>
              <div>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="healh-check-rating">Health Check Rating (0-3)</InputLabel>
                  <Select
                    labelId="type"
                    id="healthcheckrating"
                    value={hcRating}
                    label="Health Check Rating (0-3)"
                    onChange={e => setHcRating(e.target.value)}
                  >
                    <MenuItem value={"0"}>0 - Healthy</MenuItem>
                    <MenuItem value={"1"}>1 - Low Risk</MenuItem>
                    <MenuItem value={"2"}>2 - High Risk</MenuItem>
                    <MenuItem value={"3"}>3 - Critical Risk</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </>
          )}
          {type === "OccupationalHealthcare" && (
            <>
              <div>
                <TextField required fullWidth id="employer" label="Employer Name" value={employer} margin="dense" onChange={e => setEmployer(e.target.value)} />
              </div>
              <div>
                <TextField fullWidth id="sick-start-date" type="date" label="Sick Start Date" value={startSick} margin="dense" onChange={e => setStartSick(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
              </div>
              <div>
                <TextField fullWidth id="sick-end-date" type="date" label="Sick End Date" value={endSick} margin="dense" onChange={e => setEndSick(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
              </div>
            </>
          )}
          <Button variant="contained" sx={{marginRight: "0.5rem", marginTop: "0.5rem"}} onClick={submitNewEntry}>Add</Button>
          <Button variant="outlined" sx={{marginRight: "0.5rem", marginTop: "0.5rem"}} onClick={resetForm}>Cancel</Button>
        </Box>
      </CardContent>
    </Card>
    </>
  )
}



export default EntryForm