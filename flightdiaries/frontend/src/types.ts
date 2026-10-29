export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'poor' | 'good';
export interface Diary {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
};

interface FullDiary extends Diary {
  comment: string;
}

export type NewDiary = Omit<FullDiary, 'id'>;

export interface ErrorObj {
  code: string;
  values: any;
  message: string;
  length: number;
}