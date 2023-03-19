import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const root = () => {
  return (
    <>
    <Link to='/'></Link>
    <Link to='/favorite'></Link>
    <Outlet />
    </>
  )
}

export default root
