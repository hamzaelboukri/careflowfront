import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

/**
 * PublicRoute component that redirects authenticated users to dashboard
 * Used for login, register, and home pages
 */
export const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Otherwise, render the public page
  return <Outlet />
}
