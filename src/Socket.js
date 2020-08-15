// with ES6 import
import io from 'socket.io-client'

export const url = process.env.NODE_ENV === 'development' ? 'localhost:5000' : 'https://nameko-3d-othello-backend.herokuapp.com/ '

export const socket = io(url)
