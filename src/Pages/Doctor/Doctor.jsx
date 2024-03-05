import React from 'react'
import { Outlet } from 'react-router-dom'

function Doctor() {
  return (
    <div>
      Doctor
            <Outlet/>
    </div>

  )
}

export default Doctor