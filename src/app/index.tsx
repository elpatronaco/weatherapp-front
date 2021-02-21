import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import DashBoard from './dashboard'
import Login from './login'
import { CountProvider } from './store'
import './styles.css'

const NotFound = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <h1 className="display-1 text-white">404. Are you sure this is the right page?</h1>
  </div>
)

const App = () => {
  return (
    <div id="app">
      <CountProvider>
        <div className="d-flex flex-column p-0 fill">
          <header>
            <NavBar />
          </header>
          <main className="container-fluid p-0 flex-fill fill">
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route exact path="/login" component={Login} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </div>
      </CountProvider>
    </div>
  )
}

export default App
