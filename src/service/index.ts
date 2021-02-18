import axios from 'axios'
import { ICityDto, IResponse, IWeatherDto, IWeatherQuery, ILoginData } from '../models'

const { REACT_APP_API_URI } = process.env

const instance = axios.create({
  baseURL: REACT_APP_API_URI || 'localhost:4000',
  headers: { 'Content-Type': 'application/json' }
})

const setBearer = (token: string) => (instance.defaults.headers.common['authorization'] = token)

const CitiesService = {
  getByPk: (pk: string): Promise<IResponse<ICityDto>> => instance.get(`/api/cities/${pk}`),
  getAll: (): Promise<IResponse<ICityDto[]>> => instance.get('/api/cities')
}

const WeatherService = {
  getByPk: ({ pk, date }: IWeatherQuery): Promise<IResponse<IWeatherDto>> =>
    instance.get(`/api/weather/${pk}`, { params: { date } }),
  getAll: (): Promise<IResponse<IWeatherDto[]>> => instance.get('/api/weather'),
  deleteByPk: ({ pk, date }: IWeatherQuery) =>
    instance.delete(`/api/weather/${pk}`, { params: { date: date } })
}

const AuthService = {
  login: (body: ILoginData) =>
    instance.post('/auth/login', {
      ...body
    })
}

export { CitiesService, WeatherService, AuthService, setBearer }
