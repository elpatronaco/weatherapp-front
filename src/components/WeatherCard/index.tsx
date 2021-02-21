import { Fragment, useMemo, useState } from 'react'
import { dayNames, monthNames, getWeatherIcon } from '../../helpers'
import { IWeatherCard } from '../../models'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

const WeatherCard = ({
  pk,
  date,
  focused,
  hourlyTemps,
  weather,
  authorized,
  deleteCallback
}: IWeatherCard) => {
  const parsedDate = useMemo(() => new Date(date), [date])
  const [hoverDelBtn, setHoverDelBtn] = useState<boolean>(false)

  return (
    <div className="card body p-3 border-0 rounded card-wrapper d-flex align-items-center">
      {authorized && deleteCallback && (
        <FontAwesomeIcon
          className="close-btn"
          icon={faTimes}
          color={!hoverDelBtn ? 'white' : 'red'}
          size="lg"
          onMouseEnter={() => setHoverDelBtn(true)}
          onMouseLeave={() => setHoverDelBtn(false)}
          onClick={() => deleteCallback({ pk: pk, date: date })}
        />
      )}
      <p className="display-4 text-center text-white">
        {dayNames[parsedDate.getDay() !== 0 ? parsedDate.getDay() - 1 : 6]}
      </p>
      <p className="lead text-center text-white">
        <b>{`${parsedDate.getDate()}th, ${monthNames[parsedDate.getMonth() - 1]}`}</b>
      </p>
      <FontAwesomeIcon icon={getWeatherIcon(weather)} color="white" size="4x" />

      {focused ? (
        <h1 className="text-white">{hourlyTemps[new Date().getHours()]}º</h1>
      ) : (
        <div className="row">
          <h1 className="text-white">{Math.max(...hourlyTemps)}º</h1>
          <hr />
          <h1 style={{ color: 'lightskyblue' }}>{Math.min(...hourlyTemps)}º</h1>
        </div>
      )}
    </div>
  )
}

export default WeatherCard
