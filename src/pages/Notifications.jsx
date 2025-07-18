"use client"
import React from "react"
import { useNotifications } from "../hooks/useNotification"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { Link } from "react-router-dom"

export default function Notifications() {
  const { user } = useContext(AuthContext)
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
  } = useNotifications(user?._id)

  // Mark all notifications as read
  const markAllRead = () => {
    notifications
      .filter((n) => !n.read)
      .forEach((notif) => markAsRead(notif._id))
  }
  // Format time and date
  const formatDateTime = (isoString) => {
    const date = new Date(isoString)
    const formattedDate = date.toLocaleDateString()
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${formattedDate} ${formattedTime}`
  }

  if (loading) return <div className="p-4">Loading notifications...</div>
  if (error) return <div className="p-4 text-red-500">Error loading notifications</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      {notifications.length > 0 && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p>
              You have <strong>{unreadCount}</strong> unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="bg-[#B94E2E] text-white px-3 py-1 rounded hover:bg-[#7E3E3E] transition"
              >
                Mark all as read
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className={`p-4 rounded-md border ${
                  notif.read
                    ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    : "bg-[#5A1F1F] border-[#B94E2E] font-semibold text-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p>{notif.message}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      className="text-sm text-yellow-400 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <small className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDateTime(notif.createdAt)}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8">
        <Link
          to="/normal/dash"
          className="text-[#B94E2E] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
