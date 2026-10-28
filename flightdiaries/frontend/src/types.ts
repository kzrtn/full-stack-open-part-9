export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy';
export type Visibility = 'poor' | 'good';
export interface Diaries {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
};

export interface NewDiary extends Diaries {
  comment: string;
}