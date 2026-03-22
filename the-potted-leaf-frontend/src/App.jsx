import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/' element = {
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path = '/register' element = {
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        } />
        <Route path='/products/:id' element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
      </Routes>
    </div>
  )
}

export default App