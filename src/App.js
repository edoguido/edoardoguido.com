import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import { Nav } from './components/Nav'
import { Routes } from './components/routes/Routes'

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </>
  )
}

export default App
