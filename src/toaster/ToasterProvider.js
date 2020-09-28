import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import ToastContext from './context'
import Toast from './Toast'
import { concatClasses, newId } from './helpers'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
  toaster: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    padding: theme.spaces?.md,
    zIndex: 30,
    transition: 'height 3s ease-in-out',
    width: '100%',
    maxWidth: 328,
  },

  topRight: {
    top: 0,
    right: 0,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
  },

  topLeft: {
    top: 0,
    left: 0,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
  },

  slideInRight: {
    transform: `translate3d(calc(100% + ${theme.spaces?.md}), 0, 0)`,
    visibility: 'visible',
  },
  slideInRightActive: {
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 300ms ease-in',
  },
  slideOutRight: {
    transform: 'translate3d(0, 0, 0)',
  },
  slideOutRightActive: {
    visibility: 'hidden',
    transform: `translate3d(calc(100% + ${theme.spaces?.md}), 0, 0)`,
  },

  slideInLeft: {
    transform: `translate3d(calc(-100% - ${theme.spaces?.md}), 0, 0)`,
    visibility: 'visible',
  },
  slideInLeftActive: {
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 300ms ease-in',
  },
  slideOutLeft: {
    transform: 'translate3d(0, 0, 0)',
  },
  slideOutLeftActive: {
    visibility: 'hidden',
    transform: `translate3d(calc(-100% - ${theme.spaces?.md}), 0, 0)`,
  },
}))

const ToasterProvider = (props) => {
  const { position, autoClose, closeButton } = props
  const [toasts, setToasts] = useState([])
  const [transitions, setTransitions] = useState(null)
  let positionRef = useRef(position)
  let toasterRoot = useRef()
  // let transitionsCls = useRef()
  const classes = useStyles()
  console.log('<ToastProvider />', toasts)

  const toastProps = {
    position: positionRef.current,
    autoClose,
    closeButton,
  }

  const containerBuild = useCallback(() => {
    console.log('useCallback')
    const container = document.createElement('div')
    container.id = 'toaster'
    document.body.appendChild(container)
    toasterRoot.current = document.getElementById('toaster')
  }, [])

  useEffect(() => {
    containerBuild()
  }, [containerBuild])

  // useEffect(() => {
  //   console.log('useEffect', toasts)
  //   if (!transitionsCls.current) {
  //     transitionsCls.current = getTransitionsCls(position)
  //   }
  // }, [toasts, getTransitionsCls, position])

  const initToast = (title, message, options) => {
    console.log('initToast()')
    if (
      typeof title === 'string' &&
      typeof message === 'string' &&
      typeof options === 'object' &&
      !Array.isArray(options)
    ) {
      // transitionsCls.current = getTransitionsCls(options.position)
      positionRef.current = options.position
      setTransitions(getTransitionsCls(options.position))
      return {
        title,
        message,
        options: Object.assign({}, toastProps, options),
        id: newId(),
      }
    }
  }

  const toast = (title, message, options) => {
    console.log(options)
    setToasts([...toasts, initToast(title, message, options)])
  }

  const info = (title, message, options) =>
    setToasts([...toasts, initToast(title, message, 'info')])

  const success = (title, message, options) =>
    setToasts([...toasts, initToast(title, message, 'success')])

  const error = (title, message, options) =>
    setToasts([...toasts, initToast(title, message, 'error')])

  const warning = (title, message, options) =>
    setToasts([...toasts, initToast(title, message, 'warning')])

  const remove = (id) => setToasts(toasts.filter((t) => t.id !== id))

  function getTransitionsCls(position) {
    console.log('getTransitionsCls called')

    let transitions = {}

    if (position.match(/right/i)) {
      transitions.enter = classes.slideInRight
      transitions.enterActive = classes.slideInRightActive
      transitions.exit = classes.slideOutRight
      transitions.exitActive = classes.slideOutRightActive
    } else {
      transitions.enter = classes.slideInLeft
      transitions.enterActive = classes.slideInLeftActive
      transitions.exit = classes.slideOutLeft
      transitions.exitActive = classes.slideOutLeftActive
    }

    return transitions
  }

  const providerValue = {
    toast,
    // info,
    // success,
    // error,
    // warning,
    remove,
  }

  return (
    <ToastContext.Provider value={providerValue}>
      {props.children}
      {toasterRoot.current &&
        createPortal(
          <TransitionGroup
            className={concatClasses([
              classes.toaster,
              classes[positionRef.current],
            ])}
          >
            {toasts.map((t) => {
              return (
                <CSSTransition
                  key={t.id}
                  timeout={300}
                  classNames={transitions}
                >
                  <Toast {...t} remove={() => remove(t.id)} />
                </CSSTransition>
              )
            })}
          </TransitionGroup>,
          toasterRoot.current
        )}
    </ToastContext.Provider>
  )
}

ToasterProvider.protoTypes = {
  autoClose: PropTypes.number,
  closeButton: PropTypes.bool,
  position: PropTypes.string,
}

export default ToasterProvider
