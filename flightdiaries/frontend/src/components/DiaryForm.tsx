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
    };

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
      });

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <div>
          <label>date
            <input type="date" onChange={e => setDate(e.target.value)} value={date} />
          </label>
        </div>
        <div>
          <label><span style={{marginRight: '10px'}}>visibility</span>
            <label>great <input type="radio" value="great" checked={visibility==='great'} onChange={e => setVisibility(e.target.value)} /></label>
            <label>good <input type="radio" value="good" checked={visibility==='good'} onChange={e => setVisibility(e.target.value)} /></label>
            <label>ok <input type="radio" value="ok" checked={visibility==='ok'} onChange={e => setVisibility(e.target.value)} /></label>
            <label>poor <input type="radio" value="poor" checked={visibility==='poor'} onChange={e => setVisibility(e.target.value)} /></label>
          </label>
        </div>
        <div>
          <label><span style={{marginRight: '10px'}}>weather</span>
            <label>sunny <input type="radio" value="sunny" checked={weather==='sunny'} onChange={e => setWeather(e.target.value)} /></label>
            <label>rainy <input type="radio" value="rainy" checked={weather==='rainy'} onChange={e => setWeather(e.target.value)} /></label>
            <label>cloudy <input type="radio" value="cloudy" checked={weather==='cloudy'} onChange={e => setWeather(e.target.value)} /></label>
            <label>stormy<input type="radio" value="stormy" checked={weather==='stormy'} onChange={e => setWeather(e.target.value)} /></label>
            <label>windy <input type="radio" value="windy" checked={weather==='windy'} onChange={e => setWeather(e.target.value)} /></label>
          </label>
        </div>
        <div><label>comment <input type='text' value={comment} onChange={e => setComment(e.target.value)} /></label></div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;