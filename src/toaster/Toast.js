import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FiMessageCircle,
  FiAlertTriangle,
  FiAlertCircle,
  FiCheckCircle,
  FiSquare,
  FiX,
} from 'react-icons/fi'
import { concatClasses } from './helpers'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  toast: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.whiteAlt,
    padding: '1.4rem',
    transition: '0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    borderRadius: '3px 3px 3px 3px',
    boxShadow: '0 0 10px #999',
    animationDuration: '0.7s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out',
  },
  default: {
    background: `linear-gradient(to right bottom, ${theme.colors.white}, ${theme.colors.whiteAlt})
      left top no-repeat`,
    color: theme.colors.raven,
  },

  success: {
    background: `linear-gradient(to right bottom, ${theme.colors.green}, ${theme.colors.greenAlt}) left top no-repeat`,
  },

  error: {
    background: `linear-gradient(to right bottom, ${theme.colors.red}, ${theme.colors.redAlt}) left top no-repeat`,
  },

  info: {
    background: `linear-gradient(to right bottom, ${theme.colors.blue}, ${theme.colors.blueAlt}) left top no-repeat`,
  },

  warning: {
    background: `linear-gradient( to right bottom, ${theme.colors.orange}, ${theme.colors.orangeAlt}) left top no-repeat`,
  },

  information: {
    display: 'flex',
    flexDirection: 'column',
  },

  notificationTitle: {
    color: 'inherit',
    fontWeight: 600,
    fontSize: '1.6rem',
    marginBottom: '0.6rem',
  },

  notificationMessage: {
    color: 'inherit',
    margin: 0,
    fontWeight: 300,
    fontSize: '1.3rem',
  },

  notificationImage: {
    marginRight: '1.5rem',
    width: 30,
    height: 30,
    flexShrink: 0,
    '& > svg': {
      width: '100%',
    },
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    fontSize: '1.6rem',
    outline: 'none',
    padding: '1rem',
    cursor: 'pointer',
    border: 0,
  },
}))

const icons = {
  default: <FiSquare />,
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
  warning: <FiAlertTriangle />,
  info: <FiMessageCircle />,
}

function Toast(props) {
  console.log('<Toast />', props)
  const { remove, title, message, options } = props
  const { autoClose, closeButton, type } = options
  const classes = useStyles()
  const removeRef = useRef()
  removeRef.current = remove

  useEffect(() => {
    if (parseInt(autoClose, 10)) {
      const id = setTimeout(() => removeRef.current(), autoClose)
      return () => clearTimeout(id)
    }
  }, [autoClose])

  return (
    <div className={concatClasses([classes.toast, classes[type]])}>
      {closeButton && (
        <span onClick={removeRef.current} className={classes.button}>
          {<FiX />}
        </span>
      )}
      <div className={classes.notificationImage}>{icons[type]}</div>
      <div className={classes.information}>
        <p className={classes.notificationTitle}>{title}</p>
        <p className={classes.notificationMessage}>{message}</p>
      </div>
    </div>
  )
}

Toast.defaultProps = {
  remove: () => {},
  type: 'default',
}

Toast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  remove: PropTypes.func,
  options: PropTypes.shape({
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'default']),
    autoClose: PropTypes.number,
    closeButton: PropTypes.bool,
  }),
}

export default Toast
