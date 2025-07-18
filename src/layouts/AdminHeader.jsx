import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Search, User, ChevronDown } from "lucide-react";
import { useNewAdminProduct } from "../hooks/admin/useAdminProduct";
import DarkModeToggle from "../components/darkTheme/DarkModeToggle";

export default function Header() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Lifted state for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5; // fixed for dropdown list
  const [showDropdown, setShowDropdown] = useState(false);

  // Pass lifted state as params to the hook
  const { products } = useNewAdminProduct({ search: searchTerm, pageNumber, pageSize });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(1); // reset page number on new search
    setShowDropdown(true);
  };

  const handleProductClick = (id) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/admin/products/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/admin/products?search=${searchTerm}`);
      setShowDropdown(false);
    }
  };

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#A62123] text-white">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-[#A62123] font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg text-white">Servzz Pro</span>
        </div>

        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-3 py-2 rounded-md bg-white text-black focus:outline-none"
          />

          {/* Search suggestions dropdown */}
          {showDropdown && searchTerm && products.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Profile, Dark Mode Toggle & Badge */}
        <div className="flex items-center gap-4 relative group cursor-pointer">
          <DarkModeToggle />

          {/* Avatar */}
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
              <div onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                Log out
              </div>
            </div>
          </div>

          <span className="hidden sm:flex px-2 py-1 rounded-full bg-white text-[#A62123] text-xs font-semibold">
            {user.username}
          </span>
        </div>
      </div>
    </header>
  );
}
