import React, { useCallback, useEffect, useState } from 'react'
import { CitiesService, WeatherService, AuthService, setBearer } from '../service'
import { ICityDto, IWeatherDto, IWeatherQuery } from '../models'
import WeatherCard from '../components/WeatherCard'
import WeatherInfo from '../components/WeatherInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { addDays } from '../helpers'
import { AxiosResponse } from 'axios'
import useInterval from '../helpers/hooks/useInterval'
import { Modal } from 'react-bootstrap'
import './styles.css'

const Dashboard = () => {
  const [city, setCity] = useState<ICityDto | null>(null)
  const [cities, setCities] = useState<ICityDto[] | null>(null)
  const [selWeather, setWeather] = useState<IWeatherDto | null>(null)
  const [weatherArr, setWeatherArr] = useState<IWeatherDto[] | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [authorized, setAuthorized] = useState<boolean>(false)

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) {
      try {
        const result: AxiosResponse<string> = await AuthService.login({
          email: email,
          password: password
        })
        if (result.status !== 200) throw Error(result.statusText)
        localStorage.setItem('token', result.data)
        setBearer(result.data)
        setAuthorized(true)
        setShowModal(false)
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }
  }

  const handleDeleteWeather = async (query: IWeatherQuery) => {
    await WeatherService.deleteByPk({ ...query })
    await getWeather()
  }

  useEffect(() => {
    getWeather()
  }, [city, getWeather])

  useInterval(getWeather, 50000, city !== undefined)

  useEffect(() => {
    const token: string | null = localStorage.getItem('token')
    if (token !== null) {
      setAuthorized(true)
      setBearer(token)
      setShowModal(false)
    }
    getCities()
  }, [])

  return (
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
          <button
            className="btn btn-outline-primary"
            onClick={e => {
              e.preventDefault()
              setShowModal(true)
            }}
          >
            Login
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
            {Array.from({ length: 5 }).map((item, i) => {
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
                    <WeatherCard
                      {...{
                        ...weatherDay,
                        focused: i === 0,
                        authorized: authorized,
                        deleteCallback: handleDeleteWeather
                      }}
                    />
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
        {selWeather && (
          <div className="m-4 card body p-3 card-opacity">
            <WeatherInfo {...{ ...selWeather }} />
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login as admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="loginEmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPasswordInput"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Dashboard
