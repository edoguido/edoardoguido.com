import React from 'react'
import { Link } from 'react-router-dom'
import { MenuButton } from './MenuButton'

export const Nav = () => {
  return (
    <div className="nav">
      <div>About</div>
      <Link to="/">Edoardo Guido</Link>
      <MenuButton />
    </div>
  )
}
