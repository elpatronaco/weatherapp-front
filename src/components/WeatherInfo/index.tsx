import { IWeatherDto } from '../../models'
import './styles.css'

const WeatherInfo = ({ hourlyTemps }: IWeatherDto) => {
  const currDate = new Date()

  return (
    <div className="row">
      {Array.from({ length: 8 }).map((item, i) => {
        const hour = currDate.getHours() + i
        return (
          <>
            {hour <= 24 && (
              <div className="col">
                <div
                  className="card body p-3 border-0 rounded temp-card-wrapper d-flex align-items-center"
                  style={{ background: 'transparent' }}
                >
                  <p className="display-5 text-white">
                    {hour}
                    {hour <= 12 ? 'am' : 'pm'}
                  </p>
                  <p className="display-4 text-white">{hourlyTemps[hour]} º</p>
                </div>
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}

export default WeatherInfo
