import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Home } from './components/routes/home/Home'
import { Project } from './components/routes/project/Project'
import { Nav } from './components/Nav'

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div className="wrapper">
          <Switch>
            <Route exact path="/project">
              <Redirect to="/project/antani" />
            </Route>
            <Route path="/project/:id" component={Project} />
            <Route exact path="/" component={Home} />
            <Route>Page not found!</Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
