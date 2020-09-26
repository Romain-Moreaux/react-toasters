import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Toaster from './toaster'
import './index.css'

ReactDOM.render(
  // <React.StrictMode>
  <Toaster position={'topRight'} autoClose={null} closeButton={true}>
    <App />
  </Toaster>,
  // </React.StrictMode>
  document.getElementById('root')
)
