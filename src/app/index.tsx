import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CitiesService, WeatherService } from '../service'
import { ICityDto, IWeatherDto } from '../models'
import WeatherCard from '../components/WeatherCard'
import WeatherInfo from '../components/WeatherInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { addDays } from '../helpers'
import useInterval from '../helpers/hooks/useInterval'
import './styles.css'

const App = () => {
  const [city, setCity] = useState<ICityDto | null>(null)
  const [cities, setCities] = useState<ICityDto[] | null>(null)
  const [selWeather, setWeather] = useState<IWeatherDto | null>(null)
  const [weatherArr, setWeatherArr] = useState<IWeatherDto[] | null>(null)

  const getWeather = useCallback(async () => {
    try {
      if (city) {
        const { data } = await WeatherService.getByPk({ pk: city.pk })
        setWeatherArr([...Object.values(data)])
      }
    } catch {
      alert("Didn't find weather registry for that location and date")
    }
  }, [city])

  const getCities = async () => {
    const { data } = await CitiesService.getAll()
    setCities(data)
    setCity(data[0])
  }

  const changeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.split(', ')
    setCity(
      cities?.find(val => val.city.includes(selected[0]) && val.country.includes(selected[1])) ??
        null
    )
  }

  useEffect(() => {
    getWeather()
  }, [city, getWeather])

  useInterval(getWeather, 50000, city !== undefined)

  useEffect(() => {
    getCities()
  }, [])

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <b className="navbar-brand">WeatherApp</b>
          <form className="form-inline">
            <select
              className="form-control mr-sm-2"
              placeholder="No cities"
              aria-label="Search"
              onChange={changeCity}
            >
              {cities &&
                cities.map(city => (
                  <option key={`cityOption-${city.pk}`}>{`${city.city}, ${city.country}`}</option>
                ))}
            </select>
            <button type="button" data-toggle="modal" data-target="#loginModal">
              Launch modal
            </button>
          </form>
        </nav>
        <div>
          <div className="m-4 card body p-3 card-opacity">
            <h1 className="display-5 text-center text-white text-capitalize">
              {city?.city}, {city?.country}
            </h1>
            {weatherArr && weatherArr.length >= 0 && (
              <h1 className="display-3 text-center text-white">
                {weatherArr[0].hourlyTemps[new Date().getHours()]} Cº
              </h1>
            )}
            <div className="row">
              {Array.from({ length: 7 }).map((item, i) => {
                const date = addDays(new Date(), i).toISOString().split('T')[0]
                const weatherDay: IWeatherDto | undefined =
                  weatherArr && weatherArr.length > 0
                    ? weatherArr.find(item => item.date.includes(date))
                    : undefined
                return weatherDay ? (
                  <div className="col" key={`weather-row-${weatherDay.date}`}>
                    <button
                      onClick={e => {
                        e.preventDefault()
                        setWeather(weatherDay)
                      }}
                      key={`weatherdaycol-${i}`}
                    >
                      <WeatherCard {...{ ...weatherDay, focused: i === 0 }} />
                    </button>
                  </div>
                ) : (
                  <div className="col icon" key={`weather-row-${i}`}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size="4x"
                      color="white"
                      key={`weatherdaycol-${i}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          {selWeather && weatherArr && (
            <div className="m-4 card body p-3 card-opacity">
              <WeatherInfo {...{ ...selWeather }} />
            </div>
          )}
        </div>
      </div>
      <div
        className="modal fade"
        id="loginModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Recipient:
                  </label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
