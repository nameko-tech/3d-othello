import React, { useEffect, useContext, useState } from 'react'
import Top from './screens/Top'
import Play from './screens/Play'
import end from './screens/end'
import OthelloContextProvider, { OthelloContext } from './constants/context'

/* eslint react-hooks/exhaustive-deps:0 */

import io from 'socket.io-client'
import Waiting from './screens/waiting'
import { Navbar } from './Components/Navbar'

export const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://nameko-3d-othello-backend.herokuapp.com/ '

export const socket = io(url, { autoConnect: false })

const App = () => {
  const [status, setStatus] = useState(null)
  const { setSessionId, setOthelloBoard, othelloBoard } = useContext(OthelloContext)
  console.log(othelloBoard)
  useEffect(() => {
    socket.open()
    socket.on('connect', () => {
      console.log('connected!', socket.id)
      setSessionId(socket.id)
    })
    socket.on('room', (res, a, aa, aaa) => {
      console.log(a, aa, aaa)
      setStatus(res.status)
      if (res.status === 'play') {
        // 自分の色を把握
        // ゲーム画面に移る
        // 盤くるまでくるくる
      } else if (res.status === 'waiting') {
        console.log('wait for now')
      } else {
        console.error(res)
        alert('むりでえええええす')
      }
      console.log('response arrived to room', res, socket)
    })
    socket.on('game', (res) => {
      console.log('response arrived to game', res)
      setOthelloBoard(res)
    })
  }, [])

  if (status === null) {
    return <Top />
    // return <Play />
  } else if (status === 'waiting') {
    return <Waiting />
  } else if (status === 'play') {
    return <Play othelloBoard={othelloBoard} />
  } else {
    return <div>not found</div>
  }

  //   return (
  //     <div>
  //       <BrowserRouter>
  //         {/* <Navbar /> */}
  //         <div style={{ height: '3em' }} />
  //         <Switch>
  //           <Route exact path="/" component={Top} />
  //           <Route path="/play" component={Play} />
  //           <Route path="/end" component={end} />
  //           <Route render={() => <div>404</div>} status={404} />
  //         </Switch>
  //         {/* <Footer /> */}
  //       </BrowserRouter>
  //     </div>
  //   )
}

const AppContainer = () => {
  return (
    <OthelloContextProvider>
      <div style={{ background: 'snow' }}>
        <Navbar />
        <App />
      </div>
    </OthelloContextProvider>
  )
}

export default AppContainer
