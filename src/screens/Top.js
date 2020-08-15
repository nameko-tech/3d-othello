import { Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Top = () => {
  const history = useHistory()
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

  const [roomName, setRoomName] = useState('')

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      topだよ
      
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault()
          history.push('/play')
        }}
      >
        <TextField onChange={(e)=>setRoomName(e.target.value)} id="filled-basic" label="Filled" variant="filled" />
        <div className={classes.button} style={{ textAlign: 'right' }}>
          {/* <Button variant="contained">Default</Button> */}
          <Button variant="contained" color="primary" type="submit">
            あそぶ
          </Button>
          <Button onClick={()=>console.log(roomName)}>a</Button>
        </div>
      </form>
    </div>
  )
}

export default Top
