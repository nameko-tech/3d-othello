import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Top from './screens/Top'
import Play from './screens/Play'
import end from './screens/end'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div style={{ height: '3em' }} />
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/play" component={Play} />
          <Route path="/end" component={end} />
          <Route render={() => <div>404</div>} status={404} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}

export default App
