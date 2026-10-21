import express from 'express'
const patientsRouter = express.Router();

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

patientsRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default patientsRouter