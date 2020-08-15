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

  const JoinRoom = (e) => {
    console.log('おくるよ！')
    e.preventDefault()

    if (roomName === '') {
      return alert('だめでええええす')
    }
    console.log(`${roomName} に参加するよ～`)
    socket.emit('room', { roomName: roomName })
  }

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      topだよ
      <form className={classes.root} noValidate autoComplete="off" onSubmit={JoinRoom}>
        <TextField onChange={(e) => setRoomName(e.target.value)} id="filled-basic" label="Filled" variant="filled" />
        <div className={classes.button} style={{ textAlign: 'right' }}>
          {/* <Button variant="contained">Default</Button> */}
          <Button variant="contained" color="primary" type="submit">
            あそぶ
          </Button>
          <Button onClick={() => console.log(roomName)}>a</Button>
        </div>
      </form>
    </div>
  )
}

export default Top
