import { useMemo } from 'react'
import { dayNames, monthNames, getWeatherIcon } from '../../helpers'
import { IWeatherCard } from '../../models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

const WeatherCard = ({ date, focused, hourlyTemps, weather }: IWeatherCard) => {
  const parsedDate = useMemo(() => new Date(date), [date])

  return (
    <div className="card body p-3 border-0 rounded card-wrapper d-flex align-items-center">
      <p className="display-4 text-center text-white">
        {dayNames[parsedDate.getDay() !== 0 ? parsedDate.getDay() - 1 : 6]}
      </p>
      <p className="lead text-center text-white">
        <b>{`${parsedDate.getDate()}th, ${monthNames[parsedDate.getMonth() - 1]}`}</b>
      </p>
      <FontAwesomeIcon icon={getWeatherIcon(weather)} color="white" size="4x" />
      <h1 className="text-white">
        {focused
          ? `${hourlyTemps[new Date().getHours()]} Cº`
          : `${Math.max(...hourlyTemps)}º/${Math.min(...hourlyTemps)}º`}
      </h1>
    </div>
  )
}

export default WeatherCard
