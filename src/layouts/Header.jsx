"use client"

import { Search, User, ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#A62123] text-white">
      <div className="flex h-16 items-center justify-between px-4">

        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-[#A62123] font-bold text-sm">K</span>
          </div>
          <span className="font-semibold text-lg text-white">KioskPro</span>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders, products, customers..."
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white text-black focus:outline-none"
            />
          </div>
        </div>

        {/* Right - Profile & Badge */}
        <div className="flex items-center gap-4 relative group cursor-pointer">
          {/* Avatar */}
          <div className="flex items-center gap-2 px-2 hover:bg-[#911c1e] rounded-md transition-colors">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#A62123] font-bold">
              AD
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-xs text-white/70">Administrator</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>

          {/* Dropdown - shown on hover */}
          <div className="absolute right-0 top-14 w-56 bg-white text-black rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-10">
            <div className="px-4 py-2 font-semibold border-b">My Account</div>
            <div className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" /> Profile
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" /> Settings
            </div>
            <div className="border-t">
              <div className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">Log out</div>
            </div>
          </div>

          {/* Badge */}
          <span className="hidden sm:flex px-2 py-1 rounded-full bg-white text-[#A62123] text-xs font-semibold">
            Admin Panel
          </span>
        </div>
      </div>
    </header>
  )
}
