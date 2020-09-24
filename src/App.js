import React from 'react'
import { useToast } from './toaster'

function App() {
  const toast = useToast()
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Toasters</h1>
        <button
          onClick={() => toast.success('success', 'Successfuly logged in!')}
        >
          Toast info
        </button>
      </header>
    </div>
  )
}

export default App
