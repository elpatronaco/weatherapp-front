import { useEffect, useMemo } from 'react'
import { dayNames, monthNames } from '../../helpers'
import { IWeatherCard, WEATHERTYPE } from '../../models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloud,
  IconDefinition,
  faTemperatureHigh,
  faCloudRain,
  faPooStorm,
  faSun
} from '@fortawesome/free-solid-svg-icons'
import './styles.css'

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

const WeatherCard = ({ date, focused, hourlyTemps, weather }: IWeatherCard) => {
  const parsedDate = useMemo(() => new Date(date), [date])

  return (
    <div className="card-wrapper" style={{ backgroundColor: focused ? 'white' : '#F7F6F5' }}>
      <h2 className="text-day">
        {dayNames[parsedDate.getDay() !== 0 ? parsedDate.getDay() - 1 : 6]}
      </h2>
      <h2 className="text-month">{`${parsedDate.getDate()}th, ${
        monthNames[parsedDate.getMonth() - 1]
      }`}</h2>
      <FontAwesomeIcon icon={faCloud} size="7x" />
      <h1 className="text-temperature">
        {focused
          ? `${hourlyTemps[new Date().getHours()]} Cº`
          : `${Math.max(...hourlyTemps)}º/${Math.min(...hourlyTemps)}º`}
      </h1>
    </div>
  )
}

export default WeatherCard
