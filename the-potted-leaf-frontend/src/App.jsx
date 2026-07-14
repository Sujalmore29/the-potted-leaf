import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Cancel from './pages/Cancel'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import PaymentSuccess from './pages/PaymentSuccess'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'

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
        <Route path ='/register' element = {
          <Register />
        } />
        <Route path='/products/:id' element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/cart' element={
          <Cart />
        } />
        <Route path='/checkout' element={
          <Checkout />
        } />
        <Route path='/admin'
        element={
          <AdminDashboard />
        } />
        <Route path="/orders" 
        element={
          <Orders />
        } />
        <Route path='/orders/:orderId' element={
          <OrderDetails />
        } />
      </Routes>
    </div>
  )
}

export default App