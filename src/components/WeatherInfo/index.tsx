import { memo, Fragment } from 'react'
import { IWeatherDto } from '../../models'
import './styles.css'

const WeatherInfo = ({ hourlyTemps }: IWeatherDto) => {
  const currDate = new Date()

  return (
    <div className="row">
      {Array.from({ length: 8 }).map((item, i) => {
        const hour = currDate.getHours() + i + 1
        return (
          <Fragment key={`weatherinfo-${i}`}>
            {hour <= 24 && (
              <div className="col">
                <div
                  className="card body p-3 border-0 rounded temp-card-wrapper d-flex align-items-center"
                  style={{ background: 'transparent' }}
                >
                  <p className="display-5 text-white">
                    {hour <= 12 ? `${hour}am` : `${hour - 12}pm`}
                  </p>
                  <p className="display-4 text-white">{hourlyTemps[hour - 1]}º</p>
                </div>
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default memo(WeatherInfo)
