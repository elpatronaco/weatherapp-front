import React, { useCallback, useEffect, useState } from 'react'
import { CitiesService, WeatherService } from '../service'
import { ICityDto, IWeatherCard, IWeatherDto, WEATHERTYPE } from '../models'
import { Navbar, Form, Button, Row, Col, Container } from 'react-bootstrap'
import WeatherCard from '../components/WeatherCard'
import WeatherInfo from '../components/WeatherInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { addDays } from '../helpers'
import useInterval from '../helpers/hooks/useInterval'
import './styles.css'

function App() {
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
  useEffect(() => {
    getWeather()
  }, [city, getWeather])

  useInterval(getWeather, 50000, city !== undefined)

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">WeatherAPP</Navbar.Brand>
        <Form.Control
          as="select"
          size="sm"
          style={{ float: 'right', width: 300 }}
          onChange={e => {
            const selected = e.target.value.split(', ')
            setCity(
              cities?.find(
                val => val.city.includes(selected[0]) && val.country.includes(selected[1])
              ) ?? null
            )
          }}
        >
          {cities &&
            cities.map(city => (
              <option key={`cityOption-${city.pk}`}>{`${city.city}, ${city.country}`}</option>
            ))}
        </Form.Control>
      </Navbar>
      <body>
        <div
          className="body-container"
          style={{ padding: 20, backgroundColor: 'white', height: '100%', display: 'absolute' }}
        >
          <div>
            <h1 className="city-title">{city?.city}</h1>
            <h2 className="country-title">{city?.country}</h2>
          </div>
          <div className="weather-row">
            {Array.from({ length: 7 }).map((item, i) => {
              const date = addDays(new Date(), i).toISOString().split('T')[0]
              const weatherDay: IWeatherDto | undefined =
                weatherArr && weatherArr.length > 0
                  ? weatherArr.find(item => item.date.includes(date))
                  : undefined
              return weatherDay ? (
                <div className="weather-col" key={`weather-row-${weatherDay.date}`}>
                  <a onClick={() => setWeather(weatherDay)} key={`weatherdaycol-${i}`}>
                    <WeatherCard {...{ ...weatherDay, focused: i === 0 }} />
                  </a>
                </div>
              ) : (
                <div className="weather-col icon" key={`weather-row-${i}`}>
                  <FontAwesomeIcon icon={faTimesCircle} size="4x" key={`weatherdaycol-${i}`} />
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 10 }}>
            {selWeather && weatherArr && <WeatherInfo {...{ ...selWeather }} />}
          </div>
        </div>
      </body>
    </div>
  )
}

export default App
