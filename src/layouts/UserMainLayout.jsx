// src/components/user/UserMainLayout.jsx
import React from 'react'
import Header from './UserHeader'
import { Outlet } from 'react-router-dom'
import Sidebar from './MenuSideBar'

export default function UserMainLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
        <footer className="bg-[#A62123] text-white py-6 text-center">
        <h2 className="text-lg font-semibold tracking-wide mb-2">Servzz</h2>
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} Servzz. All rights reserved. Unauthorized use or duplication is prohibited.
        </p>
      </footer>
    </div>
  )
}
