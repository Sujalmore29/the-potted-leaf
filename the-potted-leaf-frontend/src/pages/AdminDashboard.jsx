import axios from "../api/axios";
import { motion } from "motion/react";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const AdminDashboard = () => {
    
    const [activeTab, setActiveTab] = useState("dashboard");

    const [stats,setStats] = useState({});

    const [users, setUsers] = useState([]);

    const [orders, setOrders] = useState([]);

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try{

            const statsRes = await axios.get("/admin/stats");
            const usersRes = await axios.get("/admin/users");
            const orderRes = await axios.get("/admin/orders");
            const plantRes = await axios.get("/plant/getAllPlants");

            setStats(statsRes.data);
            setUsers(usersRes.data);
            setOrders(orderRes.data);
            setPlants(plantRes.data);
        } catch (err){
            toast.error("Failed to load admin dashboard");
        }
    };

    const promoteUser = async (id) => {
        try{
            await axios.put(`/admin/promote/${id}`);
            toast.success("User promoted");
            fetchDashboard();
        } catch {
            toast.error("Failed");
        }
    };

    const deleteUser = async (id) => {
        try{
            await axios.delete(`/admin/user/${id}`);
            toast.success("User deleted");
            fetchDashboard();
        } catch {
            toast.error("Failed");
        }
    };

    const updateOrderStatus = async (id,status) => {
        try{
            await axios.put(`/admin/order-status/${id}?status=${status}`);
            toast.success("Status updated");
            fetchDashboard();
        } catch {
            toast.error("Failed");
        }
    };

    const deletePlant = async (id) => {
        try{
            await axios.delete(`plant/${id}`);
            toast.success("Plant deleted");
            fetchDashboard();
        } catch {
            toast.error("Failed");
        }
    };

    return(
        <div className="min-h-screen bg-green-50">
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-green-800 mb-8">
                    Admin Dashboard
                </h1>
                
                <div className="grid md:grid-cols-5 gap-6">
                
                    {/* Sidebar */}
                    <div className="bg-green-700 rounded-2xl p-4">
                        <div onClick={() => setActiveTab("dashboard")} className="bg-green-100 p-4 rounded-xl mb-4 cursor-pointer">Dashboard</div>

                        <div onClick={() => setActiveTab("users")} className="bg-green-100 p-4 rounded-xl mb-4 cursor-pointer">
                            Users
                        </div>

                        <div onClick={() => setActiveTab("orders")} className="bg-green-100 p-4 rounded-xl mb-4 cursor-pointer">Orders</div>

                        <div onClick={() => setActiveTab("plants")} className="bg-green-100 p-4 rounded-xl cursor-pointer">
                            Plants
                        </div>
                    </div>

                    {/* Content */}

                    <div className="md:col-span-4 bg-green-600 rounded-2xl p-8">

                        {/* Dashboard */}
                        {activeTab === "dashboard" && (
                            <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}>
                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-2xl p-6 shadow">
                                        <h3>Total Users</h3>
                                        <h1 className="text-4xl font-bold text-green-700">
                                            {stats.totalUsers}
                                        </h1>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 shadow">
                                        <h3>Total Orders</h3>
                                        <h1 className="text-4xl font-bold text-green-700">
                                            {stats.totalOrders}
                                        </h1>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 shadow">
                                        <h3>Total Plants</h3>
                                        <h1 className="text-4xl font-bold text-green-700">
                                            {stats.totalPlants}
                                        </h1>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 shadow">
                                        <h3>Total Revenue</h3>
                                        <h1 className="text-4xl font-bold text-green-700">
                                            ₹{stats.totalRevenue}
                                        </h1>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Users */}
                        {activeTab === "users" && (
                            <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold mb-6">Users</h2>

                                <div className="space-y-4">
                                    {users.map(user => (
                                        <div key={user.id}
                                        className="bg-white p-4 rounded-xl flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold">{user.name}</h3>

                                                <p>{user.email}</p>

                                                <p>{user.role}</p>
                                            </div>

                                            <div className="flex gap-2">
                                                {user.role !== "ADMIN" && (
                                                    <button onClick={() => promoteUser(user.id)}
                                                className="bg-green-700 text-white px-4 py-2 rounded-xl">Make Admin</button>
                                                )}

                                                <button onClick={() => deleteUser(user.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ORDERS */}
                        {activeTab === "orders" && (
                            <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold mb-6">
                                    Orders
                                </h2>

                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.orderId} className="bg-white p-4 rounded-xl">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3>
                                                    {order.plantName}
                                                </h3>
                                                <p>
                                                    ₹{order.price}
                                                </p>
                                                <p>
                                                    Qty : {order.quantity}
                                                </p>
                                            </div>

                                            <select value={order.status}
                                            onChange={(e) => updateOrderStatus(order.orderId,e.target.value)}
                                            className="border p-2 rounded-xl">
                                                <option>PAID</option>

                                                <option>PROCESSING</option>

                                                <option>SHIPPED</option>

                       +                         <option>DELIVERED</option>
                                                <option>CANCELLED</option>
                                            </select>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* PLANTS */}
                        {activeTab === "plants" && (
                            <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}>
                                <h2 className="text-2xl font-bold mb-6">Plants</h2>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {plants.map(plant => (
                                        <div key={plant.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow">
                                            <img src={`/assets/plants/${plant.imageUrl}`}
                                            className="h-56 w-full object-cover" alt="" />
                                            <div className="p-4 flex flex-col gap-2">
                                                <h3 className="font-bold text-lg text-green-800">{plant.name}</h3>
                                                <h3 className="font-semibold">Stock: {plant.stockQuantity}</h3>
                                                <h3 className="font-semibold">Price: ₹{plant.price}</h3>
                                                <button onClick={() => deletePlant(plant.id)}
                                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;