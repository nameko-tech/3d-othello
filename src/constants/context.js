import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../App'

export const OthelloContext = createContext()

const OthelloContextProvider = (props) => {
  const [sessionId, setSessionId] = useState('')
  const [roomName, setRoomName] = useState('')
  const [color, setColor] = useState('')
  const [othelloBoard, setOthelloBoard] = useState(null)
  const [myColor, setMyColor] = useState('')
  const [selectedPiece, setSelectedPiece] = useState([])

  useEffect(() => {
    if (selectedPiece.length) {
      socket.emit('game', { piece: selectedPiece, room: roomName, color: myColor })
      setSelectedPiece([])
    }
  }, [selectedPiece])

  return (
    <OthelloContext.Provider
      value={{
        roomName,
        setRoomName,
        sessionId,
        setSessionId,
        color,
        setColor,
        othelloBoard,
        setOthelloBoard,
        myColor,
        setMyColor,
        selectedPiece,
        setSelectedPiece
      }}
    >
      {props.children}
    </OthelloContext.Provider>
  )
}

export default OthelloContextProvider
