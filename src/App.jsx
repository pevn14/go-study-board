import { useState, useEffect } from 'react'
import GoBoard from './components/GoBoard'
import './App.css'

function App() {
  // Initialiser le dark mode depuis localStorage ou false par défaut
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved === 'true'
  })

  // Appliquer la classe dark-mode sur :root quand darkMode change
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark-mode')
    } else {
      root.classList.remove('dark-mode')
    }
    // Persister dans localStorage
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Go Study Board</h1>
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {darkMode ? '☀' : '☾'}
        </button>
      </header>
      <p className="instructions">
        Cliquez pour placer/supprimer des pierres
      </p>
      <GoBoard />
    </div>
  )
}

export default App
