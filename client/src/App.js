import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Auth from './components/Auth'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import "./App.css"
import PostForm from "./pages/PostForm"
import { UserContext } from './context/UserProvider'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      {token && <Nav logout={logout}/>}
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <Profile />
            </ProtectedRoute>
            }
        />
        <Route 
          path="/home"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <Home />
            </ProtectedRoute>
            }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <PostForm />
            </ProtectedRoute>
          }
          />
      </Routes>
    </div>
  )
}