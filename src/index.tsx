import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import reportWebVitals from './reportWebVitals'
import dotenv from 'dotenv'
import './helpers/styles/index.css'
import './helpers/styles/bootstrap.css'

dotenv.config({})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
