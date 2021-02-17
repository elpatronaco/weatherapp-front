import axios from 'axios'
import { ICityDto, IResponse, IWeatherDto, IWeatherQuery } from '../models'

const instance = axios.create({
  baseURL: process.env.API_URI || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
})

const CitiesService = {
  getByPk: (pk: string): Promise<IResponse<ICityDto>> => instance.get(`/api/cities/${pk}`),
  getAll: (): Promise<IResponse<ICityDto[]>> => instance.get('/api/cities')
}

const WeatherService = {
  getByPk: ({ pk, date }: IWeatherQuery): Promise<IResponse<IWeatherDto>> =>
    instance.get(`/api/weather/${pk}`, { params: { date } }),
  getAll: (): Promise<IResponse<IWeatherDto[]>> => instance.get('/api/weather')
}

export { CitiesService, WeatherService }
