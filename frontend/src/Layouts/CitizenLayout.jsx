import React from 'react'
import AuthNavBar from '../components/AuthNavBar'
import  {Outlet }from 'react-router-dom'
const CitizenLayout = () => {
  return (
    <div>
      <AuthNavBar/>
      <Outlet/>
    </div>
  )
}

export default CitizenLayout
