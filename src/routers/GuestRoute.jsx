import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

import React from 'react'

export default function GuestRoute() {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <>Loading</>

    if (user) return <Navigate to="/" />

    return <Outlet />
}
