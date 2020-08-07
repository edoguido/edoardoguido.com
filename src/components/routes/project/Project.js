import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const Project = ({ match }) => {
  const { id } = match.params

  return (
    <>
      <div>This is project {id}</div>
      <Link to="/">Back to homepage</Link>
    </>
  )
}