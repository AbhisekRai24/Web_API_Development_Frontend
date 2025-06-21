
// export default function AdminLayout() {
//     const { user, logout } = useContext(AuthContext);

//     return (
//         <div className="flex h-screen">
//             <aside className="w-64 shadow-lg p-4">
//                 <h2 className="text-xl  font-bold mb-6">Admin Panel</h2>
//                 <nav className="flex flex-col space-y-3 ">
//                     <NavLink
//                         to="/admin/users"
//                         className={({ isActive }) =>
//                             `${isActive
//                                 ? "text-red-600 font-semibold"
//                                 : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Users
//                     </NavLink>
//                     <NavLink
//                         to="/admin/products"
//                         className={({ isActive }) =>
//                             `${isActive
//                                 ? "text-red-600 font-semibold"
//                                 : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Products
//                     </NavLink>
//                     <NavLink
//                         to="/admin/categories"
//                         className={({ isActive }) =>
//                             `${isActive
//                                 ? "text-red-600 font-semibold"
//                                 : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Categories
//                     </NavLink>
//                 </nav>
//             </aside>
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <header className="shadow-md px-6 py-4 flex justify-between items-center">
//                     <span className="text-lg font-medium">
//                         Welcome, {user?.username || "Admin"}
//                     </span>
//                     <button
//                         onClick={logout}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                         Logout
//                     </button>
//                 </header>

//                 {/* Content area */}
//                 <main className="p-6 overflow-y-auto flex-1">
//                     <Outlet />
//                 </main>
//                 <footer className="text-center">
//                     2025 @ My App
//                 </footer>
//             </div>
//         </div>
//     );
// }

import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import Header from './Header'
import { ChevronDown } from "lucide-react";
import {
    FaHome,
    FaClipboardList,
    FaCog,
    FaPlusSquare,
    FaOptinMonster,
} from "react-icons/fa";

export default function AdminLayout() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    // Function to check if the current route is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col h-screen">
            <Header user={user} logout={logout} />

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-white shadow-lg p-4 overflow-auto">
                    <h2 className="text-xl font-bold mb-6">Admin</h2>
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
                    </nav>
                    <p className="text-sm text-gray-400 mt-10">Servzz Admin Panel</p>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto">
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
                    : "text-gray-700 hover:text-[#A62123] hover:bg-gray-100"}
            `}
        >
            <span>{icon}</span>
            <span className="font-normal">{label}</span>
        </div>
    </Link>
);
