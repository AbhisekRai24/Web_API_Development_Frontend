"use client"
import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider"
import { User, ChevronDown } from "lucide-react"
import { getBackendImageUrl } from "../utils/backend-image"
import DarkModeToggle from "../components/darkTheme/DarkModeToggle"
import NotificationDropdown from "../components/NotificationDropDown" // import here

export default function Header() {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-[#5A1F1F] text-gray-900 dark:text-gray-100">
      <div className="flex h-20 items-center justify-between px-6">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center">
            <span className="text-[#B94E2E] font-bold text-sm select-none">S</span>
          </div>
          <span className="font-semibold text-lg select-none">Servzz Pro</span>
        </div>

        {/* Right - Nav Links + Profile + Notifications */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex gap-4 text-sm font-medium">
            <Link
              to="/normal/home"
              className="text-[#B94E2E] dark:text-white hover:bg-[#F3E8E5] dark:hover:bg-[#7E3E3E] px-3 py-1 rounded-md transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/normal/myorders"
              className="text-[#B94E2E] dark:text-white hover:bg-[#F3E8E5] dark:hover:bg-[#7E3E3E] px-3 py-1 rounded-md transition-colors duration-200"
            >
              My Orders
            </Link>
          </nav>

          <DarkModeToggle />

          {/* Notification Dropdown */}
          <NotificationDropdown userId={user._id} />

          {/* Profile Dropdown */}
          <div
            ref={dropdownRef}
            className="flex items-center gap-4 relative cursor-pointer select-none"
          >
            <div
              className="flex items-center gap-2 px-2 hover:bg-[#F3E8E5] dark:hover:bg-[#7E3E3E] rounded-md transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-700 dark:bg-gray-900 flex items-center justify-center text-white font-bold ring-2 ring-[#B94E2E]">
                {user.profileImage ? (
                  <img
                    src={getBackendImageUrl(user.profileImage)}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "/default-profile.png"
                    }}
                  />
                ) : (
                  user.username ? user.username.charAt(0).toUpperCase() : "?"
                )}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span>{user.username || "User"}</span>
                <span className="text-xs text-gray-300">{user.role || "Role"}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-56 bg-[#5A1F1F] text-gray-100 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 font-semibold border-b border-[#7E3E3E]">
                  My Account
                </div>
                <Link
                  to="/normal/profile"
                  className="px-4 py-2 hover:bg-[#7E3E3E] flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(false)} // close dropdown after click
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <div className="border-t border-[#7E3E3E]">
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-400 hover:bg-red-600 cursor-pointer"
                  >
                    Log out
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Badge */}
          <span className="hidden sm:flex px-2 py-1 rounded-full bg-[#B94E2E] text-white text-xs font-semibold ml-2">
            {user.username}
          </span>
        </div>
      </div>
    </header>
  )
}
