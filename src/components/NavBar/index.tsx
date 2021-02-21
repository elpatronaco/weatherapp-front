import { useHistory } from 'react-router-dom'

const NavBar = () => {
  const history = useHistory()

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand" href="/">
        <b>WeatherApp</b>
      </a>
      <form className="form-inline">
        {/* <select
          className="form-control mr-sm-2"
          placeholder="No cities"
          aria-label="Search"
          onChange={changeCity}
        >
          {cities &&
            cities.map(city => (
              <option key={`cityOption-${city.pk}`}>{`${city.city}, ${city.country}`}</option>
            ))}
        </select> */}
        <button className="btn btn-outline-primary" onClick={() => history.push('/login')}>
          Login
        </button>
      </form>
    </nav>
  )
}

export default NavBar
