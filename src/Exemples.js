import React from 'react'
import logo from './toaster-blue.png'
import { useToast } from './toaster'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
  header: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    display: 'flex',
    '& > img': {
      width: 26,
    },
    '& > a': {
      fontSize: '2.4rem',
      fontWeight: 300,
      marginLeft: '1rem',
    },
  },
  section: {
    ...theme.wrappers.w1280,
  },
  sectionInt: {
    ...theme.sections.int,
  },
  button: {
    ...theme.buttons.prototype,
  },
}))

const Button = ({ children, cb, model }) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <button
      style={{ ...theme.buttons[model] }}
      className={classes.button}
      onClick={cb}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  model: 'default',
}

Button.propTypes = {
  model: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
  cb: PropTypes.func,
  children: PropTypes.node,
}

export default function Exemples() {
  const toast = useToast()
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>
          <img src={logo} alt="React Toaster" />
          <a href="https://github.com/Romain-Moreaux/react-toasters">
            React Toasters
          </a>
        </h1>
      </header>
      <section className={classes.section}>
        <div className={classes.sectionInt}>
          <div style={{ ...theme.boxes.left }}>
            <h2>
              Guide the user through your application with a notification system
            </h2>
            <Button
              model="success"
              cb={() =>
                toast.success('success', 'Your informations has been saved')
              }
            >
              Toast Success
            </Button>
            <Button
              model="error"
              cb={() => toast.error('error', 'An error has occurred!')}
            >
              Toast error
            </Button>
            <Button
              model="warning"
              cb={() =>
                toast.warning('warning', 'You should complete all fields')
              }
            >
              Toast warning
            </Button>
            <Button
              model="info"
              cb={() => toast.info('info', 'You have received a new message')}
            >
              Toast info
            </Button>
            <Button
              cb={() =>
                toast('default', "Don't forget to complete your registration")
              }
            >
              Toast info
            </Button>
          </div>
          <div style={{ ...theme.boxes.right }}>La boite de code</div>
        </div>
      </section>
    </>
  )
}
