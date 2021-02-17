import { WEATHERTYPE, IWeatherDto } from '../../models'
import {
  faCloud,
  IconDefinition,
  faTemperatureHigh,
  faCloudRain,
  faPooStorm,
  faSun
} from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap'
import './styles.scss'

const getWeatherIcon = (weather: WEATHERTYPE): IconDefinition => {
  switch (weather) {
    case WEATHERTYPE.CLOUDY:
      return faCloud
    case WEATHERTYPE.RAINY:
      return faCloudRain
    case WEATHERTYPE.STORMY:
      return faPooStorm
    case WEATHERTYPE.SUNNY:
      return faSun
    default:
      return faTemperatureHigh
  }
}

const WeatherInfo = ({ date, hourlyTemps, weather }: IWeatherDto) => {
  const currDate = new Date()

  return (
    <Table bordered hover style={{ backgroundColor: 'white' }}>
      <thead>
        <tr>
          <th>Hora</th>
          {Array.from({ length: 8 }).map((val, i) => (
            <>{currDate.getHours() + i <= 24 && <th>{currDate.getHours() + i}</th>}</>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Temp º</td>
          {Array.from({ length: 8 }).map((val, i) => (
            <>
              {currDate.getHours() + i <= 24 && (
                <td>{hourlyTemps[currDate.getHours() + i - 1]}º</td>
              )}
            </>
          ))}
        </tr>
      </tbody>
    </Table>
  )
}

export default WeatherInfo
