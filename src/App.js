import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { Helmet } from 'react-helmet'
// import 'mobx-react-lite/batchingForReactDom'

// Components
import { State } from './state'
import { Nav } from './components/Nav'
import { Routes } from './components/routes/Routes'

const state = State.create()
window.STATE = state

function App() {
  return (
    <Provider state={state}>
      <Router>
        <Helmet>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "d3xhs4evhv");
              `,
            }}
          />
        </Helmet>
        <Nav />
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
