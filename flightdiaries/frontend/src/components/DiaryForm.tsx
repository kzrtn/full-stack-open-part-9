import { useState } from 'react';
import type { NewDiary, Diary, Weather, Visibility } from '../types';
import axios from 'axios';

type setDiariesType = React.Dispatch<React.SetStateAction<Diary[]>>;

const DiaryForm = ({diaries, setDiaries}: {diaries: Diary[], setDiaries: setDiariesType}) => {
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

    axios.post<Diary>(`/api/diaries`, newDiary).then((res) => {
      setDiaries(diaries.concat(res.data));
      console.log(res.data);
    })

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }
  return (
    <div>
      <h2>Add new entry</h2>
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