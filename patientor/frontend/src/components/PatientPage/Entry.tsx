import { Typography } from "@mui/material";
import type { Diagnosis, Entry } from "../../types";

const renderCodes = (codes:string[], diagnoses: Diagnosis[]) => {
  const codeList = codes.map(code => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return {
      code,
      diagnosis
    }
  })
  console.log(codeList);
  return (
    <ul>
      {codeList.map(code => (
        <li key={code.code}><Typography>{code.code} {code.diagnosis?.name}</Typography></li>
      ))}
    </ul>
  )
};

const Entry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  const {date, description} = entry;

  return (
    <div>
      <Typography>{date} {description}</Typography>
      {entry.diagnosisCodes && renderCodes(entry.diagnosisCodes, diagnoses)}
    </div>
  );
};

export default Entry;
