import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Toaster from './toaster'

ReactDOM.render(
  <React.StrictMode>
    <Toaster position={'topRight'} autoClose={5000} closeButton={true}>
      <App />
    </Toaster>
  </React.StrictMode>,
  document.getElementById('root')
)
