import React, { useEffect, useContext, useState } from 'react'
import Top from './screens/Top'
import Play from './screens/Play'
import end from './screens/end'
import OthelloContextProvider, { OthelloContext } from './constants/context'

/* eslint react-hooks/exhaustive-deps:0 */

import io from 'socket.io-client'
import Waiting from './screens/waiting'
import { Navbar } from './Components/Navbar'

export const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://nameko-3d-othello-backend.herokuapp.com/'
// export const url = 'https://nameko-3d-othello-backend.herokuapp.com/'

export const socket = io(url, { autoConnect: false })

const App = () => {
  const [status, setStatus] = useState(null)
  const { setSessionId, setOthelloBoard, othelloBoard, setMyColor } = useContext(OthelloContext)
  useEffect(() => {
    socket.open()
    socket.on('connect', () => {
      setSessionId(socket.id)
    })
    socket.on('room', (res) => {
      setStatus(res.status)
      if (res.status === 'play') {
        // 自分の色を把握
        setMyColor(res.color)
        // ゲーム画面に移る
        // 盤くるまでくるくる
      } else if (res.status === 'waiting') {
        console.log('wait for now')
      } else {
        console.error(res)
        // alert('この部屋名は既に使われています')
      }
      console.log('room => ', res)
    })
    socket.on('game', (res) => {
      console.log('game => ', res)
      setOthelloBoard(res)
    })
  }, [])

  if (!status) {
    return <Top />
  } else if (status === 'waiting') {
    return <Waiting />
  } else if (status === 'play') {
    return <Play othelloBoard={othelloBoard} />
  } else {
    return <div>not found</div>
  }
}

const AppContainer = () => {
  return (
    <OthelloContextProvider>
      <div style={{ background: '#21273d', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <div style={{ height: '1px', width: '95%', margin: '0 auto', background: 'grey' }} />
        <App />
      </div>
    </OthelloContextProvider>
  )
}

export default AppContainer
