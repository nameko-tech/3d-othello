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
      socket.emit('game', { piece: selectedPiece, room: roomName })
      setSelectedPiece([])
    }
  }, [selectedPiece])

  // const [selectedRestaurant, setSelectedRestaurant] = useState(null) // str
  // const [determinedCart, setDeterminedCart] = useState(null)
  // const [selectedTime, setSelectedTime] = useState('')
  // const [selectedTimeLabel, setSelectedTimeLabel] = useState('')

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
