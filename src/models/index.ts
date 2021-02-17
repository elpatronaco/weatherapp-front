export interface IKey {
  pk: string
}

export interface IWeather {
  date: string
  weather: WEATHERTYPE
  hourlyTemps: Array<number>
}

export interface IWeatherQuery extends IKey {
  date?: string
}

export interface ICity {
  city: string
  country: string
}

export enum WEATHERTYPE {
  SUNNY = 'Sun',
  CLOUDY = 'Clouds',
  RAINY = 'Rain',
  STORMY = 'Storm'
}

export interface ICityDto extends IKey, ICity {}

export interface IWeatherDto extends IKey, IWeather {}

export interface IResponse<T> {
  data: T
}

export interface IWeatherCard extends IWeatherDto {
  focused: boolean
}
