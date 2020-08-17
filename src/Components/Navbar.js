import React from 'react'
import logo from '../logo.png'

export const Navbar = () => {
  return (
    <div style={{ width: '100%', height: '7vh', background: '#21273d' }}>
      <div style={{ color: 'skyblue', maxWidth: '200px', margin: '0 auto' }}>
        <img
          src={logo}
          alt="brand logo"
          style={{ display: 'inline-block', margin: '10px auto', height: '100%', width: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
