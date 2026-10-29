import { useState } from 'react';
import { isAxiosError } from 'axios';

import type { NewDiary, Diary, Weather, Visibility, ErrorObj } from '../types';
import diaryService from '../services/diaryService';

type setDiariesType = React.Dispatch<React.SetStateAction<Diary[]>>;

interface propsType {
  diaries: Diary[];
  setDiaries: setDiariesType;
  setNotif: (text: string) => void;
}

const DiaryForm = ({diaries, setDiaries, setNotif}: propsType) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const submitDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiary: NewDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }

    diaryService
      .create(newDiary)
      .then(returnedDiary => setDiaries(diaries.concat(returnedDiary)))
      .catch(error => {
        let text = 'Error: ';
        if(isAxiosError(error)) {
          if (error.response) {
            error.response.data.error.map((e:ErrorObj) => text = text.concat(`${e.message}. `));
            setNotif(text);
          }
        } else {
          setNotif(`${text} ${error}`);
        }
      })

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }
  return (
    <div>
      <form onSubmit={submitDiary}>
        <div><label>date <input type='text' onChange={e => setDate(e.target.value)} /></label></div>
        <div><label>visibility <input type='text' onChange={e => setVisibility(e.target.value)} /></label></div>
        <div><label>weather <input type='text' onChange={e => setWeather(e.target.value)} /></label></div>
        <div><label>comment <input type='text' onChange={e => setComment(e.target.value)} /></label></div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm