import React from 'react'
import {
  materialLight,
  materialDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { createUseStyles } from 'react-jss'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
  codeExample: {
    maxWidth: '100%',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
  },
}))

const CodeExample = (props) => {
  const classes = useStyles()
  return <div className={classes.codeExample} {...props} />
}

const themeChoices = {
  light: materialLight,
  dark: materialDark,
}

const CodeBlock = ({ children, theme, ...props }) => {
  return (
    <CodeExample>
      <SyntaxHighlighter
        showLineNumbers
        language="jsx"
        style={themeChoices[theme]}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </CodeExample>
  )
}

CodeBlock.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(['light', 'dark']),
}

CodeBlock.defaultProps = {
  theme: 'light',
}

export default CodeBlock
