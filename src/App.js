import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import 'mobx-react-lite/batchingForReactDom'
import { State } from './state'

// Components
import { Nav } from './components/Nav'
import { Routes } from './components/routes/Routes'

const state = State.create()
window.STATE = state

function App() {
  return (
    <Provider state={state}>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
