import React from 'react'
import { useToast } from './toaster'
import './App.css'
import logo from './toaster-blue.png'

function App() {
  const toast = useToast()
  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">
          <img src={logo} alt="React Toaster" />
          <a href="https://github.com/Romain-Moreaux/react-toasters">
            React Toasters
          </a>
        </h1>
      </header>
      <section className="section">
        <div className="section-int">
          <div className="box-left">
            <h2>
              Guide the user through your application with a notification system
            </h2>
            <button
              className="btn btn-success"
              onClick={() =>
                toast.success('success', 'Your modification has been saved')
              }
            >
              Toast success
            </button>
            <button
              className="btn btn-error"
              onClick={() => toast.error('error', 'An error has occurred!')}
            >
              Toast error
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                toast.warning('warning', 'You should complete all fields')
              }
            >
              Toast warning
            </button>
            <button
              className="btn btn-info"
              onClick={() =>
                toast.info('info', 'You have received a new message')
              }
            >
              Toast info
            </button>
            <button
              className="btn btn-default"
              onClick={() =>
                toast('default', "Don't forget to complete your registration")
              }
            >
              Toast info
            </button>
          </div>
          <div className="box-right">
            <pre className="editor-pre">
              <code className="editor-code">
                <span className="editor-text-blue">import</span>
                <span className="editor-text-grey">&lcub;</span> useToasts
                <span className="editor-text-grey">&rcub;</span>
                <span className="editor-text-blue">from</span>
                <span className="editor-text-green">
                  'react-toast-notifications'
                </span>
                <span className="editor-text-blue">export</span>
                <span className="editor-text-blue">const</span>
                <span className="editor-text-green">ToastDemo</span>
                <span className="editor-code-blue-alt">=</span>
                <span className="editor-text-grey">(</span>
                <span className="editor-text-grey">&lcub;</span> content
                <span className="editor-text-grey">&rcub;</span>
                <span className="editor-text-grey">)</span>
                <span className="editor-code-blue-alt">=&gt;</span>
                <span className="editor-text-grey">&lcub;</span>
                <span className="editor-text-blue">const</span>
                <span className="editor-text-grey">&lcub;</span> addToast
                <span className="editor-text-grey">&rcub;</span>
                <span className="editor-code-blue-alt">=</span>
                <span className="editor-text-green">useToasts</span>
                <span className="editor-text-grey">(</span>
                <span className="editor-text-grey">)</span>
                <span className="editor-text-blue">return</span>
                <span className="editor-text-grey">(</span>
                <span className="editor-text-purple">
                  <span className="editor-text-purple">
                    <span className="editor-text-grey">&lt;</span>Button
                  </span>
                  <span className="editor-text-purple-light">onClick</span>
                  <span>
                    <span className="editor-text-grey">=</span>
                    <span className="editor-text-grey">&lcub;</span>
                    <span className="editor-text-grey">(</span>
                    <span className="editor-text-grey">)</span>
                    <span className="editor-code-blue-alt">=&gt;</span>
                    <span className="editor-text-green">addToast</span>
                    <span className="editor-text-grey">(</span>content
                    <span className="editor-text-grey">,</span>
                    <span className="editor-text-grey">&lcub;</span>
                    appearance<span className="editor-text-grey">:</span>
                    <span className="editor-text-green">'success'</span>
                    <span className="editor-text-grey">,</span>
                    autoDismiss<span className="editor-text-grey">:</span>
                    <span className="editor-text-orange">false</span>
                    <span className="editor-text-grey">,</span>
                    <span className="editor-text-grey">&rcub;</span>
                    <span className="editor-text-grey">)</span>
                    <span className="editor-text-grey">&rcub;</span>
                  </span>
                  <span className="editor-text-grey">&gt;</span>
                </span>
                <span>Add Toast</span>
                <span className="editor-text-purple">
                  <span className="editor-text-purple">
                    <span className="editor-text-grey">&lt;/</span>Button
                  </span>
                  <span className="editor-text-grey">&gt;</span>
                </span>
                <span className="editor-text-grey">)</span>
                <span className="editor-text-grey">&rcub;</span>
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
