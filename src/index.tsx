import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './app'
import reportWebVitals from './reportWebVitals'
import './helpers/styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
