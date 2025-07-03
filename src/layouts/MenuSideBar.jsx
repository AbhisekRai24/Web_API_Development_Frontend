// src/components/user/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminCategory } from '../hooks/admin/useAdminCategory';
import {
  FaListAlt,
  FaUtensils,
  FaTags
} from 'react-icons/fa';

export default function Sidebar() {
  const { categories, isLoading, isError } = useAdminCategory();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-lg p-4 overflow-auto h-screen">
      <h2 className="text-xl font-bold mb-6">User Menu</h2>
      <nav className="space-y-6">

       
        <SidebarItem
          icon={<FaUtensils />}
          label="All Menu"
          to="/normal/dash"
          active={isActive("/normal/dash")}
        />

        <hr className="border-t border-gray-300 my-4" />

        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {isError && <p className="text-red-500 text-sm">Failed to load categories</p>}

        {!isLoading && !isError && categories.map((cat) => (
          <SidebarItem
            key={cat._id}
            icon={<FaTags />}
            label={cat.name}
            to={`/normal/user/category/${cat._id}`}
            active={isActive(`/normal/user/category/${cat._id}`)}
          />
        ))}
      </nav>

      <p className="text-sm text-gray-400 mt-10">Servzz User Panel</p>
    </aside>
  );
}

const SidebarItem = ({ icon, label, to = "#", active }) => (
  <Link to={to} className="block rounded-md">
    <div
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all
        ${active
          ? "bg-[#A62123] text-white font-semibold"
          : "text-gray-700 hover:text-[#A62123] hover:bg-gray-100"}
      `}
    >
      <span>{icon}</span>
      <span className="font-bold">{label}</span>
    </div>
  </Link>
);
