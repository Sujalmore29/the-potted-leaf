import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { motion, scale } from 'motion/react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Profile = () => {

  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  const fetchUser = async () => {
    try{
      const res = await axios.get("/user/getUser");
      setUser(res.data);
    } catch {
      toast.error("Failed to load user");
    }
  }

  const fetchOrders = async () => {
    try{
      const res = await axios.get("/orders/getOrders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      toast.error("No orders");
    }
  };

  const updateProfile = async () => {
      try{
        await axios.put("/user/update-user", user);
        toast.success("Profile updated");
      } catch {
        toast.error("Failed to update profile");
      }
  };

  const changePassword = async () => {
    try{
      await axios.post("/user/change-password", {
        newPassword: document.getElementById("newPassword").value,
      });
      toast.success("Password updated");
    } catch (err) {
      toast.error("Failed to update password");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const tabs = [
    { key: "profile", label: "Personal Information" },
    { key: "orders", label: "My Orders" },
    { key: "address", label: "Manage Address" },
    { key: "password", label: "Password Manager" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <div>
      <Navbar />
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.8 }}
      className='bg-green-600 rounded-2xl max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-4 gap-8 mt-26 mb-8'>

      { /* Sidebar */ }
      <motion.div
        className='space-y-4'>
        {tabs.map(tab => (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.55 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`p-4 rounded-2xl cursor-pointer border ${
              activeTab === tab.key? "bg-green-700 text-black font-semibold" : "bg-green-100 hover:bg-green-200 hover:scale-105 transition"
            }`}>
              {tab.label}
          </motion.div>
        ))}
      </motion.div>

      {/* Content */ }
      <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.55 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }} className='bg-green-100 md:col-span-3 px-18 py-6 rounded-2xl shadow'>

        {/* Profile */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className='text-2xl font-bold mb-6 text-green-800'>Personal Information</h2>

            <div className='grid md:grid-rows-4 max-w-md gap-4'>
             <input 
                value={user.name || ""}
                onChange={(e) => setUser({...user, name: e.target.value })}
                placeholder='Name'
                className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
              />

            <input
              value={user.email || ""}
              onChange={(e) => setUser({...user, email: e.target.value })}
              placeholder='Email'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.contact || ""}
              onChange={(e) => setUser({...user, contact: e.target.value })}
              placeholder='Contact'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
              value={user.gender || ""}
              onChange={(e) => setUser({...user, gender: e.target.value })}
              placeholder='Gender'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
          </div>
          <div className='flex flex-col mt-4 space-y-4 max-w-md'>
            
          </div>
            <button onClick={updateProfile}
            className='mt-6 h-12 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition duration-300'>
              Update Changes
            </button>
          </motion.div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}>
            <h2 className='text-2xl font-bold mb-6 text-green-800'>My Orders</h2>

            {orders.map((order) => (
              <div 
                key={order.id}
                className='border p-4 rounded-xl mb-4'>
                  <p className='font-semibold'>Order ID: {order.id}</p>
                  <p>Plant: {order.plantName}</p>
                  <p>Total: ₹{order.price}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {order.orderDate}</p>
                </div>
            ))}
          </motion.div>
        )}

        {/*Address*/}
        {activeTab === "address" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8}}>
            <h2 className='text-2xl font-bold mb-6 text-green-800'>Address</h2>

            <div className='grid md:grid-rows-4 max-w-md gap-4'>
              <input 
                value={user.name || ""}
                onChange={(e) => setUser({...user, name: e.target.value })}
                placeholder='Name'
                className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />

            <input
              value={user.email || ""}
              onChange={(e) => setUser({...user, email: e.target.value })}
              placeholder='Email'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.country || ""}
              onChange={(e) => setUser({...user, country: e.target.value })}
              placeholder='Country'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.street_address || ""}
              onChange={(e) => setUser({...user, street_address: e.target.value })}
              placeholder='Street Address'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.city || ""}
              onChange={(e) => setUser({...user, city: e.target.value })}
              placeholder='City'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.state || ""}
              onChange={(e) => setUser({...user, state: e.target.value })}
              placeholder='State'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.zip_code || ""}
              onChange={(e) => setUser({...user, zip_code: e.target.value })}
              placeholder='Zip Code'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            <input
            value={user.contact || ""}
              onChange={(e) => setUser({...user, contact: e.target.value })}
              placeholder='Contact'
              className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
            
          </div>
          <div className='flex flex-col mt-4 space-y-4 max-w-md'>
            
          </div>
            <button onClick={updateProfile}
            className='mt-6 h-12 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition duration-300'>
              Add Address
            </button>
            </motion.div>
        )}
        {/*Password*/}
        {activeTab === "password" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8}}
          className='max-w-md flex flex-col'>
            <h2 className='text-2xl font-bold mb-6 text-green-800'>Password Manager</h2>
            <input id='oldPassword' placeholder='Old Password' className='border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600' />
            <input id='newPassword' placeholder='New Password' className='border p-3 rounded-xl mt-6 focus:outline-none focus:ring-2 focus:ring-green-600' />

            <button onClick={changePassword} className='bg-green-700 text-white px-6 py-2 rounded-xl mt-6'>
              Update Password
            </button>
          </motion.div>
        )}
          {/*Logout*/}
          {activeTab === "logout" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <h2 className='text-2xl font-bold mb-6 text-green-800'>Logout</h2>

              <button onClick={logout}
              className='bg-red-500 text-white px-6 py-2 rounded-xl'>Yes, Logout</button>
            </motion.div>
        )}
      </motion.div>
    </motion.div>
  </div>
  )
}

export default Profile