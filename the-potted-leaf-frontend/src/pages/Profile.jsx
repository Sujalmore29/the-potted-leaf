import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { motion, scale } from 'motion/react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Profile = () => {

  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({});
  const [address, setaddress] = useState([]);
  const [orders, setOrders] = useState([]);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [selectedId, setselectedId] = useState(null)
  const [form, setform] = useState({
    type: "Home",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: ""
  });

//select address
const handleSelect = (addr) => {
  if(addr.id === selectedId){
    setselectedId(null);
    setform({
      type: "Home",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: ""
    });
  }else{
    setselectedId(addr.id);
    setform({
      type: addr.type || "Home",
      country: addr.country || "",
      streetAddress: addr.streetAddress || "",
      city: addr.city || "",
      state: addr.state || "",
      zipCode: addr.zipCode || ""
    }); //fills form for editing
  }
};

//Add or update address
const handleSubmit = async () => {
  try{
    if(selectedId){
      //Update
      await axios.put(`/address/update/${selectedId}`,form);
      toast.success("Address updated");
    }else{
      //Add address
      await axios.post("/address/add-address", form);
      toast.success("Address added");
    }
  }catch {
    toast.error("Something went wrong");
  }
};

  useEffect(() => {
    fetchUser();
    fetchOrders();
    fetchAddress();
  }, []);

  const fetchUser = async () => {
    try{
      const res = await axios.get("/user/getUser");
      setUser(res.data);
    } catch {
      toast.error("Failed to load user");
    }
  }

  const fetchAddress = async () => {
    const res = await axios.get("/address/get-address");
    setaddress(Array.isArray(res.data) ? res.data : []);
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
      await axios.put("/user/change-password", passwordData);
      toast.success("Password updated");
    } catch (err) {
      toast.error(err.response?.data || "Failed to update password");
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
            <select
                  value={user.gender || ""}
                  onChange={(e) => 
                    setUser({...user, gender: e.target.value })
                  }
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
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
                  <p><span className='font-semibold'>Order ID: </span>{order.orderId}</p>
                  <p><span className='font-semibold'>Plant: </span>{order.plantName}</p>
                  <p><span className='font-semibold'>Pot Size: </span>{order.potSize}</p>
                  <p><span className='font-semibold'>Pot Color: </span>{order.potColor}</p>
                  <p><span className='font-semibold'>Pot Material: </span>{order.potMaterial}</p>
                  <p><span className='font-semibold'>Quantity: </span>{order.quantity}</p>
                  <p><span className='font-semibold'>Plant Price: </span>₹{order.price}</p>
                  <p><span className='font-semibold'>Status: </span>{order.status}</p>
                  <p><span className='font-semibold'>Date: </span>{order.orderDate}</p>
                </div>
            ))}
          </motion.div>
        )}

        {/*Address*/}
        {activeTab === "address" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8}}>
            <h2 className='px-1 text-2xl font-bold mb-6 text-green-800'>Addresses</h2>

            {/* Address Card */}
            <div className='grid md:grid-rows-2 max-w-full gap-4 mb-6'>
              {address?.map((addr) => (
                <div 
                  key={addr.id}
                  onClick={() => handleSelect(addr)}
                  className={`cursor-pointer p-4 rounded-xl border transition ${
                    selectedId === addr.id 
                      ? "border-green-700 bg-green-200 shadow-md"
                      : "border-gray-400 bg-white hover:shadow"
                  }`}
                > 
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-semibold text-lg text-green-800'>
                      {addr.type}
                    </span>
                    {selectedId === addr.id && (
                      <span className='text-xs bg-green-600 text-white px-2 py-1 rounded'>
                        Selected
                      </span>
                    )}
                  </div>

                  <p className='text-md text-gray-700'>
                    {addr.streetAddress}, {addr.city}
                  </p>
                  <p className='text-md text-gray-500'>
                    {addr.state}, {addr.country} - {addr.zipCode}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className='bg-green-50 p-6 rounded-2xl shadow-sm'>
              <h3 className='text-lg font-semibold mb-4 text-green-900'>
                {selectedId ? "Update Address" : "Add New Address"}
              </h3>

              <div className='grid md:grid-rows gap-4'>
                {/*Type*/}
                <select
                  value={form.type || "Home"}
                  onChange={(e) => 
                    setform({ ...form, type: e.target.value })
                  }
                  className=' w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                >
                  <option>Home</option>
                  <option>Office</option>
                  <option>Shop</option>
                  <option>Other</option>
                </select>

                <input
                  placeholder='Country'
                  value={form.country || ""}
                  onChange={(e) => 
                    setform({ ...form, country: e.target.value })
                  }
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />
                <input
                  value={form.streetAddress || ""}
                  onChange={(e) => setform({ ...form, streetAddress: e.target.value })}
                  placeholder='Street Address'
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />
                <input
                  value={form.city || ""}
                  onChange={(e) => setform({ ...form, city: e.target.value })}
                  placeholder='City'
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />
                <input
                  value={form.state || ""}
                  onChange={(e) => setform({ ...form, state: e.target.value })}
                  placeholder='State'
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />
                <input
                  value={form.zipCode || ""}
                  onChange={(e) => setform({ ...form, zipCode: e.target.value })}
                  placeholder='Zip Code'
                  className='w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600'
                />
              </div>
            </div>
          
            <button onClick={handleSubmit}
            className='mt-6 h-12 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition duration-300'>
              {selectedId ? "Update Address" : "Add Address"}
            </button>
            </motion.div>
        )}
        {/*Password*/}
        {activeTab === "password" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8}}
          className='max-w-md flex flex-col'>
            <h2 className='text-2xl font-bold mb-6 text-green-800'>Password Manager</h2>

            <input type="password" placeholder='Old Password' onChange={(e) => setPasswordData({...passwordData, oldPassword:e.target.value })} className='border p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-green-600' />

            <input type="password" placeholder="New Password" onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value })} className='border p-3 rounded-xl mt-6 focus:outline-none focus:ring-2 focus:ring-green-600' />

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