import { useState } from 'react'
import GoBoard from './components/GoBoard'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Go Study Board</h1>
      <p className="instructions">
        Cliquez pour placer/supprimer des pierres
      </p>
      <GoBoard size={9} />
    </div>
  )
}

export default App
