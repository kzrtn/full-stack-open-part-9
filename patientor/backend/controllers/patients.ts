import express from 'express';
const patientsRouter = express.Router();

interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
};

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
};

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

patientsRouter.get('/patients', (_req, res) => {
  const test: Patient = {
    id: "12345",
    name: "John Smith",
    occupation: "Mailman",
    gender: "male" as Gender,
    ssn: "987654",
    "dateOfBirth": "01-01-1990"
  };

  const arr: Patient[] = [ test ];

  res.json(arr);
  //res.json({})
});

export default patientsRouter;