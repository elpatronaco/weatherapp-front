import React, { useCallback, useEffect, useState } from 'react'
import { CitiesService, WeatherService, setBearer } from '../../service'
import { ICityDto, IWeatherDto, IWeatherQuery } from '../../models'
import WeatherCard from '../../components/WeatherCard'
import WeatherInfo from '../../components/WeatherInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { addDays, getWeatherIcon } from '../../helpers'
import useInterval from '../../helpers/hooks/useInterval'
import './styles.css'
import { useContextState } from '../store'
import { actions } from '../store/actions'

const Dashboard = () => {
  const [city, setCity] = useState<ICityDto | null>(null)
  const [cities, setCities] = useState<ICityDto[] | null>(null)
  const [selWeather, setWeather] = useState<IWeatherDto | null>(null)
  const [weatherArr, setWeatherArr] = useState<IWeatherDto[] | null>(null)
  const [searchVal, setSearchVal] = useState<string>('')
  const [state, dispatch] = useContextState()

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
  }

  const changeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchVal(e.target.value)
    const selected = e.target.value.split(', ')
    const city = cities?.find(
      val => val.city.includes(selected[0]) && val.country.includes(selected[1])
    )
    if (city) setCity(city)
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
      dispatch(actions.setAuthorized(true))
      setBearer(token)
    }
    getCities()
  }, [dispatch])

  return (
    <div className={!city ? 'd-flex justify-content-center align-items-center fill' : ''}>
      <div className="w-100 mt-3 d-flex justify-content-center">
        <input
          list="cities"
          value={searchVal}
          className="custom-select w-50 "
          onChange={changeCity}
          placeholder="Search a location"
        />
        {cities && cities.length > 0 && (
          <datalist id="cities">
            {cities.map(c => (
              <option value={`${c.city}, ${c.country}`} key={`city-select-${c.pk}`} />
            ))}
          </datalist>
        )}
      </div>
      {city && (
        <div className="m-4 card body p-3 card-opacity">
          <div className="container-fluid">
            <div className="row justify-content-center m-3">
              {weatherArr && weatherArr.length >= 0 && city && (
                <>
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon
                      icon={getWeatherIcon(weatherArr[0].weather)}
                      size="8x"
                      color="white"
                      className="justify-content-center align-self-center"
                    />
                  </div>
                  <div className="col-3">
                    <h1 className="display-5 text-center text-white text-capitalize">
                      {city?.city}, {city?.country}
                    </h1>
                    <h1 className="display-3 text-center text-white">
                      {weatherArr[0].hourlyTemps[new Date().getHours()]} Cº
                    </h1>
                  </div>
                </>
              )}
            </div>
            <div className="spacing" />
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
                        setWeather(!selWeather || selWeather !== weatherDay ? weatherDay : null)
                      }}
                      key={`weatherdaycol-${i}`}
                    >
                      <WeatherCard
                        {...{
                          ...weatherDay,
                          focused: i === 0,
                          authorized: state.authorized,
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
            <div className="row m-4 card body p-3 card-opacity">
              <WeatherInfo {...{ ...selWeather }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard
