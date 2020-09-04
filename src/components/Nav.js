import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from './menu/Menu'

export const Nav = () => {
  return (
    <div className="nav">
      <Link to="/about">About</Link>
      <Link to="/">Edoardo Guido</Link>
      <Menu />
    </div>
  )
}
