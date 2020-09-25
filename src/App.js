import React from 'react'
import { ThemeProvider } from 'react-jss'
import Exemples from './Exemples'
import ToasterProvider from './toaster'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Nunito Sans:300,400,600,700,800,900', 'sans-serif'],
  },
})

const theme = {
  colors: {
    raven: 'rgb(18, 38, 63)',
    green: 'rgb(0, 217, 126)',
    greenAlt: 'rgb(0, 179, 104)',
    red: 'rgb(230, 55, 87)',
    redAlt: 'rgb(204, 25, 58)',
    orange: 'rgb(253, 126, 20)',
    orangeAlt: 'rgb(227, 104, 2)',
    blue: 'rgb(44, 123, 229)',
    blueAlt: 'rgb(25, 103, 204)',
    white: 'rgb(254, 254, 253)',
    whiteAlt: 'rgb(249, 251, 253)',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  texts: {
    xs: '1.1rem',
    sm: '1.3rem',
    md: '1.6rem',
    lg: '1.9rem',
    xl: '2.3rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  fonts: {
    primary: "'Nunito Sans', sans-serif",
  },
  wrappers: {
    w975: {
      maxWidth: 975,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    w1280: {
      maxWidth: 1280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    w11366: {
      maxWidth: 1366,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    w1480: {
      maxWidth: 1440,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  sections: {
    int: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '100vh',
    },
  },
  boxes: {
    left: { flex: 1 },
    right: { flex: 1 },
  },
  buttons: {
    prototype: {
      outline: 0,
      border: 0,
      borderRadius: 4,
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: '3.5rem',
      paddingLeft: '1.3rem',
      paddingRight: '1.3rem',
      transition:
        'box-shadow 150ms cubic-bezier(0.2, 0, 0, 1) 0s, transform 150ms cubic-bezier(0.2, 0, 0, 1) 0s',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 'rgba(9, 30, 66, 0.13) 0px 2px 1px',
      },
    },
    default: {
      background:
        'linear-gradient(to right bottom, rgb(254, 254, 253), rgb(249, 251, 253)) left top no-repeat',
      color: 'rgb(18, 38, 63)',
      border: '1px solid rgb(18, 38, 63)',
    },
    success: {
      background:
        'linear-gradient(to right bottom, rgb(0, 217, 126), rgb(0, 204, 119)) left top no-repeat',
    },
    info: {
      background:
        'linear-gradient(to right bottom, rgb(44, 123, 229), rgb(25, 103, 204)) left top no-repeat',
    },
    error: {
      background:
        'linear-gradient(to right bottom, rgb(230, 55, 87), rgb(204, 25, 58)) left top no-repeat',
    },
    warning: {
      background:
        'linear-gradient(to right bottom, rgb(253, 126, 20), rgb(227, 104, 2)) left top no-repeat',
    },
  },
  spaces: {
    xxl: '4.8rem',
    xl: '3.6rem',
    lg: '2.4rem',
    md: '1.2rem',
    sm: '.8rem',
    xs: '.4rem',
  },
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider position="topRight" autoClose={5000} closeButton={true}>
        <div className="App">
          <Exemples />
        </div>
      </ToasterProvider>
    </ThemeProvider>
  )
}

export default App
