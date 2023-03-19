import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const root = () => {
  return (
    <>
    <Link to='/'>HOME</Link>
    <Link to='/favorite'>FAVORITE</Link>
    <Outlet />
    </>
  )
}

export default root
