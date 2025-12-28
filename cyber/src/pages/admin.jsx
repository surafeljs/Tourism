import React from 'react'
import '../styles/admin.css'
import { Navigate } from 'react-router-dom'

export default function Admin({ token, user, isAdmin }){
  // If not signed in, redirect to signin
  if(!token) return <Navigate to={'/signin'} />

  // Only the configured single admin can access this page
  if(!isAdmin) return <Navigate to={'/'} />

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <p className="welcome">Welcome, {user?.firstname || token}</p>
      <div className="card">
        <h3>Restricted Access</h3>
        <p>This admin panel is restricted to the single configured administrator.</p>
      </div>
    </div>
  )
}
