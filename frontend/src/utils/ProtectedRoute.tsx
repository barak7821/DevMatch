import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: React.ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps): React.JSX.Element {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated === null) {
        return <></>
    }

    if (!isAuthenticated) {
        localStorage.removeItem("token")
        return <Navigate to="/" />
    }
    
    return (
        <>
            {children}
        </>
    )
}