import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ToastContext from './context'
import Toast from './Toast'
import { concatClasses, newId } from './helpers'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  toaster: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    maxWidth: 328,
    padding: theme.spaces?.md,
    zIndex: 3,
    transition: 'max-height 3s ease-in-out',
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
  const [toasts, setToasts] = useState([])
  let transitionsCls = useRef()
  const classes = useStyles()
  const toastsRoot = document.getElementById('toasts')

  const { position, autoClose, closeButton } = props

  useEffect(() => {
    if (!transitionsCls.current) {
      transitionsCls.current = getTransitionsCls(position)
    }
  })

  const initToast = (title, message, type) => {
    console.log('initToast called')

    if (
      typeof title === 'string' &&
      typeof message === 'string' &&
      typeof type === 'string'
    ) {
      return {
        title,
        message,
        type,
        id: newId(),
      }
    }
  }

  const toast = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'default')])

  const info = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'info')])

  const success = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'success')])

  const error = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'error')])

  const warning = (title, message) =>
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

  const toastProps = {
    position,
    autoClose,
    closeButton,
  }

  const providerValue = {
    toast,
    info,
    success,
    error,
    warning,
    remove,
  }

  return (
    <ToastContext.Provider value={providerValue}>
      {props.children}
      {createPortal(
        <TransitionGroup
          className={concatClasses([classes.toaster, classes[position]])}
        >
          {toasts.map((t) => {
            return (
              <CSSTransition
                key={t.id}
                timeout={300}
                classNames={transitionsCls.current}
              >
                <Toast {...t} remove={() => remove(t.id)} {...toastProps} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>,
        toastsRoot
      )}
    </ToastContext.Provider>
  )
}

export default ToasterProvider
