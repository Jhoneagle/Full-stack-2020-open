import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/createAnecdote">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

export default Menu
