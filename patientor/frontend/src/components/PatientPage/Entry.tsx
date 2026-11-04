import { Card, CardContent, Typography } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import EmergencyIcon from '@mui/icons-material/Emergency';
import type { Diagnosis, Entry } from "../../types";
import { Favorite } from '@mui/icons-material';

const renderCodes = (codes:string[], diagnoses: Diagnosis[]) => {
  const codeList = codes.map(code => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return {
      code,
      diagnosis
    }
  })
  return (
    <ul>
      {codeList.map(code => (
        <li key={code.code}><Typography>{code.code} {code.diagnosis?.name}</Typography></li>
      ))}
    </ul>
  )
};

const Entry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  const {date, description, type, specialist} = entry;

  let renderInfo;

  switch (type) {
    case "HealthCheck":
      let ratingIcon = (<></>);
      switch (entry.healthCheckRating) {
        case 0:
          ratingIcon = (<Favorite sx={{ color:"green" }}/>)
          break;
        case 1:
          ratingIcon = (<Favorite sx={{ color:"yellow" }}/>)
          break;
        case 2:
          ratingIcon = (<Favorite sx={{ color:"orange" }}/>)
          break;
        case 3:
          ratingIcon = (<Favorite sx={{ color:"red" }}/>)
          break;
        default:
          throw new Error(`Unknown healthCheckRating found ${entry.healthCheckRating}`);
      }
      
      renderInfo = (
        <>
          <Typography>{date} <MedicalServicesIcon /></Typography>
          <div>
            <Typography sx={{ fontStyle:"italic" }}>{description}</Typography>
            {ratingIcon}
            <Typography>Diagnose by {specialist}</Typography>
          </div>
        </>
      );
      break;
    case "Hospital":
      renderInfo = (
        <>
          <Typography>{date} <EmergencyIcon /></Typography>
          <div>
            <Typography sx={{ fontStyle:"italic" }}>{description}</Typography>
            <Typography>Diagnose by {specialist}</Typography>
            {entry?.discharge && (
              <>
                <Typography sx={{ fontWeight: "bold", marginTop: "0.5rem"}}>Discharge data:</Typography>
                <Typography>{entry.discharge.date}: {entry.discharge.criteria}</Typography>
              </>      
            )}
          </div>
        </>
      );
      break;
    case "OccupationalHealthcare":
      renderInfo = (
        <>
          <Typography>{date} <WorkIcon /> <i>{entry.employerName}</i></Typography>
          <div>
            <Typography sx={{ fontStyle:"italic" }}>{description}</Typography>
            <Typography>Diagnose by {specialist}</Typography>
          </div>
        </>
      );
      break;
    default:
      throw new Error(`invalid entry type found ${type}`);
  }

  return (
    <div>
      <Card variant="outlined" sx={{ marginBottom: "1rem"}}>
        <CardContent>
      {renderInfo}
        </CardContent>
      </Card>
      {entry.diagnosisCodes && renderCodes(entry.diagnosisCodes, diagnoses)}
    </div>
  );
};

export default Entry;
