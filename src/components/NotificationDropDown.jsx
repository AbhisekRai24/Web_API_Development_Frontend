// src/components/NotificationDropdown.jsx
"use client"

import React, { useState } from "react"
import {
  Badge,
  IconButton,
  Popover,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import { Link } from "react-router-dom"
import { useNotifications } from "../hooks/useNotification"

export default function NotificationDropdown({ userId }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { notifications, unreadCount, markAsRead } = useNotifications(userId)
  const theme = useTheme()

  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // Format message and status
  function formatNotification(notif) {
    const orderIdMatch = notif.message.match(/([a-zA-Z0-9]{8,})/)
    const orderId = orderIdMatch ? orderIdMatch[1] : null
    const shortOrderId = orderId ? orderId.slice(-8) : null

    const status =
      notif.status ||
      (() => {
        if (/pending/i.test(notif.message)) return "pending"
        if (/processing/i.test(notif.message)) return "processing"
        if (/completed/i.test(notif.message)) return "completed"
        return null
      })()

    let baseMsg = ""
    switch (status) {
      case "pending":
        baseMsg = "Your order is pending confirmation"
        break
      case "processing":
        baseMsg = "Your order is being prepared"
        break
      case "completed":
        baseMsg = "Your order has been delivered. Enjoy your meal!"
        break
      default:
        baseMsg = notif.message
    }

    return shortOrderId ? `${baseMsg}. Order #${shortOrderId}` : baseMsg
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "warning.main"
      case "processing":
        return "info.main"
      case "completed":
        return "success.main"
      default:
        return "text.secondary"
    }
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount > 9 ? "9+" : unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 350,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
        </Box>
        <Divider />

        {notifications.length === 0 ? (
          <Box p={2} textAlign="center" color="text.secondary">
            No notifications
          </Box>
        ) : (
          <List sx={{ maxHeight: 300, overflowY: "auto" }}>
            {notifications.slice(0, 5).map((notif) => (
              <ListItem
                button
                key={notif._id}
                onClick={() => {
                  markAsRead(notif._id)
                  handleClose()
                }}
                sx={{
                  bgcolor: notif.read ? "transparent" : "action.hover",
                  borderBottom: "1px solid",
                  borderColor: theme.palette.divider,
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: 10,
                      color: notif.read
                        ? theme.palette.text.disabled
                        : getStatusColor(notif.status),
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      fontWeight={notif.read ? "normal" : "bold"}
                    >
                      {formatNotification(notif)}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(notif.createdAt)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        {notifications.length > 0 && (
          <>
            <Divider />
            <Box p={1.5} textAlign="center">
              <Link
                to="/normal/notification"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onClick={handleClose}
              >
                See all notifications
              </Link>
            </Box>
          </>
        )}
      </Popover>
    </>
  )
}
