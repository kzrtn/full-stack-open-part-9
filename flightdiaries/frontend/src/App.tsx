import { useEffect, useState } from 'react';
import type { Diary } from './types';
import diaryService from './services/diaryService';
import DiaryForm from './components/DiaryForm';
import Notify from './components/Notify';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notif, setNotif] = useState('');

  useEffect(() => {
    diaryService
      .getAll()
      .then(returnedDiaries => setDiaries(returnedDiaries));
  }, [])
  
  return (
    <div>
      <h2>Add new entry</h2>
      <Notify text={notif} />
      <DiaryForm setDiaries={setDiaries} diaries={diaries} setNotif={setNotif} />
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <p><b>{diary.date}</b></p>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  )
}

export default App
