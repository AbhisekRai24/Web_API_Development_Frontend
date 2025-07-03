"use client"
import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider"
import { User, ChevronDown } from "lucide-react"

function Welcome(props) {
  return <>{props.name}</>;
}

export default function Header() {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) return null;

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#A62123] text-white">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-[#A62123] font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg text-white">Servzz Pro</span>
        </div>

        {/* Right - Nav Links + Profile */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex gap-4 text-sm font-medium">
            <Link
              to="/normal/dash"
              className="text-white hover:bg-[#911c1e] px-3 py-1 rounded-md transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/normal/myorders"
              className="text-white hover:bg-[#911c1e] px-3 py-1 rounded-md transition-all duration-200"
            >
              My Orders
            </Link>
          </nav>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-4 relative group cursor-pointer">
            <div className="flex items-center gap-2 px-2 hover:bg-[#911c1e] rounded-md transition-colors">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#A62123] font-bold">
                {user.username ? user.username.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{user.username || "User"}</span>
                <span className="text-xs text-white/70">{user.role || "Role"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 top-14 w-56 bg-white text-black rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-10">
              <div className="px-4 py-2 font-semibold border-b">My Account</div>
              <div className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" /> Profile
              </div>
              <div className="border-t">
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  Log out
                </div>
              </div>
            </div>

            {/* Badge */}
            <span className="hidden sm:flex px-2 py-1 rounded-full bg-white text-[#A62123] text-xs font-semibold">
              <Welcome name={user.username} />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
