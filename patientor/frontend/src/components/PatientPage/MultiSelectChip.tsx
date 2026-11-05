import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  },
};

interface propTypes {
  diagnosisCodes: string[],
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>,
  diagnoses: Array<{
    code: string,
    name: string,
    latin?: string
  }>
}

export default function MultiSelectChip({diagnosisCodes, setDiagnosisCodes, diagnoses}: propTypes) {
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl fullWidth margin="dense">
        <InputLabel id="diagnosis-codes-select">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-lable"
          id="diagnosis-codes"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Diagnosis Codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnoses.map(diagnose => (
            <MenuItem
              key={diagnose.code}
              value={diagnose.code}
            >
              {`${diagnose.code} - ${diagnose.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
