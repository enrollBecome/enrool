import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default AppLayout