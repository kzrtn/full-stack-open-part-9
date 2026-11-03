import { Typography } from "@mui/material";
import type { Entry } from "../../types";

const renderCodes = (codes:string[]) => {
  return (
    <ul>
      {codes.map((code: string) => (
        <li key={code}><Typography>{code}</Typography></li>
      ))}
    </ul>
  )
};

const Entry = ({ entry }: { entry: Entry }) => {
  const {date, description} = entry;

  return (
    <div>
      <Typography>{date} {description}</Typography>
      {entry.diagnosisCodes && renderCodes(entry.diagnosisCodes)}
    </div>
  );
};

export default Entry;
