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
      <h1>Go Study Board</h1>
      <p className="instructions">
        Cliquez pour placer/supprimer des pierres
      </p>
      <GoBoard size={9} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
    </div>
  )
}

export default App
