import { useEffect, useState } from 'react';
import type { Diary } from './types';
import diaryService from './services/diaryService';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then(returnedDiaries => setDiaries(returnedDiaries));
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
