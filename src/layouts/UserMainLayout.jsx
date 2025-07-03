// src/components/user/UserMainLayout.jsx
import React from 'react'
import Header from './UserHeader'
import { Outlet } from 'react-router-dom'
import Sidebar from './MenuSideBar'

export default function UserMainLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
