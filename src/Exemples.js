import React, { useState } from 'react'
import logo from './toaster-blue.png'
import { useToast } from './toaster'
import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'

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
    marginBottom: '3rem',
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
  choices: {
    marginBottom: '2rem',
  },
  radio: {},
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

const exampleCode = ({
  appearance,
}) => `import { useToasts } from 'react-toaster'
export const ToastDemo = ({ content }) => {
  const toast = useToasts()
  return (
    <Button onClick={() => toast.${appearance}('${appearance}', content)}>
      Add Toast
    </Button>
  )
}
`

const appearances = [
  { value: 'success', label: 'Success' },
  { value: 'error', label: 'Error' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'default', label: 'Default' },
]

export default function Exemples() {
  const toast = useToast()
  const classes = useStyles()
  const theme = useTheme()
  const [appearance, setAppearance] = useState('info')

  const handleAppearanceChange = (e) => {
    console.log('handleAppearanceChange', e)
    setAppearance(e.target.value)
  }

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

            <form value={appearance}>
              {appearances.map((a) => (
                <label
                  key={a.value}
                  style={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    marginRight: '1em',
                  }}
                >
                  <input
                    type="radio"
                    value={a.value}
                    checked={appearance === a.value}
                    onChange={handleAppearanceChange}
                  />
                  <div style={{ marginLeft: '0.25rem' }}>{a.label}</div>
                </label>
              ))}
            </form>
            <Button
              model={appearance}
              cb={() =>
                toast(appearance, 'Your informations has been saved', {
                  type: appearance,
                  position: 'bottomRight',
                })
              }
            >
              Send Toast
            </Button>
          </div>
          <div style={{ ...theme.boxes.right }}>
            <CodeBlock>{exampleCode({ appearance })}</CodeBlock>
          </div>
        </div>
      </section>
    </>
  )
}
