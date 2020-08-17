import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { socket } from '../App'
import { OthelloContext } from '../constants/context'

/* eslint react-hooks/exhaustive-deps:0 */

const Top = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    button: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }))

  const classes = useStyles()

  const { roomName, setRoomName } = useContext(OthelloContext)
  const [submitting, setSubmitting] = useState(false)
  const JoinRoom = (e) => {
    e.preventDefault()

    if (roomName === '') {
      return alert('部屋名を入れてください')
    }
    setSubmitting(true)
    console.log(`${roomName} に参加するよ～`)
    socket.emit('room', { roomName: roomName })
  }

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', background: 'lightgray', borderRadius: '6px', margin: '3em auto', width: '80%' }}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={JoinRoom}>
          <div style={{ height: '3vh' }} />
          <TextField onChange={(e) => setRoomName(e.target.value)} id="filled-basic" label="部屋名" variant="filled" />
          <div style={{ textAlign: 'center', margin: '0 auto' }}>
            <div style={{ height: '2vh' }} />
            <Button variant="contained" type="submit">
              あそぶ
            </Button>
          </div>
          <div style={{ height: '3vh' }} />
        </form>
      </div>
    </div>
  )
}

export default Top
