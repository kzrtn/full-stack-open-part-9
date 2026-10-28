import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Diaries } from './types';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(() => {
    axios.get<Diaries[]>(`/api/diaries`).then(res => {
      setDiaries(res.data);
    });
  }, [])
  
  return (
    <div>
      <DiaryForm setDiaries={setDiaries} diaries={diaries} />
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
