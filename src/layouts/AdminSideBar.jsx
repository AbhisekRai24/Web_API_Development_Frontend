import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import Header from './AdminHeader'
import { ChevronDown } from "lucide-react";
import {
    FaHome,
    FaClipboardList,
    FaCog,
    FaPlusSquare,
    FaOptinMonster,
    FaImage,
} from "react-icons/fa";

export default function AdminLayout() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    // Function to check if the current route is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header user={user} logout={logout} />

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-auto border-r border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin</h2>
                    <nav className="space-y-6">
                        <SidebarItem
                            icon={<FaHome />}
                            label="Dashboard"
                            to="/admin/dashboard"
                            active={isActive("/admin/dashboard")}
                        />
                        <SidebarItem
                            icon={<FaClipboardList />}
                            label="Users"
                            to="/admin/user"
                            active={isActive("/admin/user")}
                        />
                        <SidebarItem
                            icon={<FaCog />}
                            label="Product Add"
                            to="/admin/addproduct"
                            active={isActive("/admin/addproduct")}
                        />
                        <SidebarItem
                            icon={<FaPlusSquare />}
                            label="Product List"
                            to="/admin/products"
                            active={isActive("/admin/products")}
                        />
                        <SidebarItem
                            icon={<FaOptinMonster />}
                            label="Category Add"
                            to="/admin/category"
                            active={isActive("/admin/category")}
                        />
                        <SidebarItem
                            icon={< FaImage />}   // You can import this or use any icon you prefer
                            label="Banner"
                            to="/admin/banner/create"
                            active={isActive("/admin/banner/create")}
                        />
                    </nav>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-10">Servzz Admin Panel</p>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors">
                    <Outlet />
                </main>
            </div>

            <footer className="bg-[#A62123] text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-lg font-semibold tracking-wide mb-2">Servzz</h2>
                    <p className="text-sm opacity-90">
                        © {new Date().getFullYear()} Servzz. All rights reserved. Unauthorized use or duplication is prohibited.
                    </p>
                </div>
            </footer>
        </div>
    );
}

// SidebarItem component (inside the same file or import if extracted)
const SidebarItem = ({ icon, label, to = "#", active }) => (
    <Link to={to} className="block rounded md">
        <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all
                ${active
                    ? "bg-[#A62123] text-white font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#A62123] hover:bg-gray-100 dark:hover:bg-gray-700"
                }
            `}
        >
            <span>{icon}</span>
            <span className="font-bold">{label}</span>
        </div>
    </Link>
);
