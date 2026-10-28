import axios from 'axios';
import { useEffect, useState } from 'react';

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy';
type visibility = 'poor' | 'good';

interface Diaries {
  id: string;
  date: string;
  weather: Weather;
  visibility: visibility;
};

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(() => {
    axios.get<Diaries[]>(`/api/diaries`).then(res => {
      setDiaries(res.data);
    });
  }, [])
  
  return (
    <div>
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
