import axios from "../api/axios";
import { motion } from "motion/react";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
    
    const [activeTab, setActiveTab] = useState("dashboard");

    const [stats,setStats] = useState({});

    const [users, setUsers] = useState([]);

    const [orders, setOrders] = useState([]);

    const [plants, setPlants] = useState([]);

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [showPlantModal, setShowPlantModal] = useState(false);

    const [plantForm, setPlantForm] = useState({
        name:"",
        shortDescription:"",
        longDescription:"",
        price:"",
        stockQuantity:"",
        sizes:"",
        colors:"",
        materials:"",
        imageUrl:""
    });

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

    const createPlant = async() => {
        try{
            await axios.post("/plant",plantForm);
            toast.success("Plant Added Successfully");
            setPlantForm({
                name:"",
                shortDescription:"",
                longDescription:"",
                price:"",
                stockQuantity:"",
                sizes:"",
                colors:"",
                materials:"",
                imageUrl:""
            })
            setShowPlantModal(false);
            fetchDashboard();
        }catch{
            toast.error("Failed");
        }
    }

    return(
        <div className="min-h-screen bg-green-50">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8 mt-14">
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
                                <div className="grid md:grid-cols-5 gap-4 mt-6">
                                    <div className="bg-white rounded-xl p-5 shadow">
                                        <h4>Paid</h4>
                                        <h2 className="text-3xl font-bold text-green-700">
                                            {stats.paidOrders}
                                        </h2>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow">
                                        <h4>Processing</h4>
                                        <h2 className="text-3xl font-bold text-yellow-500">{stats.processingOrders}</h2>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow">
                                        <h4>Shipped</h4>
                                        <h2 className="text-3xl font-bold text-yellow-500">{stats.shippedOrders}</h2>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow">
                                        <h4>Delivered</h4>
                                        <h2 className="text-3xl font-bold text-yellow-500">{stats.deliveredOrders}</h2>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow">
                                        <h4>Cancelled</h4>
                                        <h2 className="text-3xl font-bold text-yellow-500">{stats.cancelledOrders}</h2>
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

                                <select value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border rounded-xl p-3 mb-5 bg-green-50">
                                    <option value="ALL">All Orders</option>
                                    <option value="PAID">Paid</option>
                                    <option value="PROCESSING">Processing</option>
                                    <option value="SHIPPED">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                                <div className="space-y-4">
                                    {orders.filter(order => {
                                        if(statusFilter === "ALL"){
                                            return true;
                                        }
                                        return order.status === statusFilter;
                                    }).map(order => (
                                        <div key={order.orderId} className="bg-white p-4 rounded-xl border shadow-2xl">
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

                                                <option>SHIPPED</option>        <option>DELIVERED</option>
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

                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Plants
                                    </h2>
                                    <button onClick={() => setShowPlantModal(true)}
                                    className="bg-green-700 text-white px-6 py-3 rounded-xl">
                                        + Add Plant
                                    </button>
                                </div>
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
            {
                showPlantModal && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl w-162.5 px-8 py-2">
                            <h2 className="text-2xl font-bold mb-5">Add Plant</h2>
                            <div className="grid gap-2">
                                <input
                                    placeholder="Plant Name"
                                    value={plantForm.name}
                                    onChange={(e) => setPlantForm({...plantForm,name:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Short Description"
                                    value={plantForm.shortDescription}
                                    onChange={(e) => setPlantForm({...plantForm,shortDescription:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Long Description"
                                    value={plantForm.longDescription}
                                    onChange={(e) => setPlantForm({...plantForm,longDescription:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Price"
                                    value={plantForm.price}
                                    onChange={(e) => setPlantForm({...plantForm,price:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Stock"
                                    value={plantForm.stockQuantity}
                                    onChange={(e) => setPlantForm({...plantForm,stockQuantity:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Sizes (Small, Medium, Large)"
                                    value={plantForm.sizes}
                                    onChange={(e) => setPlantForm({...plantForm,sizes:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Colors"
                                    value={plantForm.colors}
                                    onChange={(e) => setPlantForm({...plantForm,colors:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Materials"
                                    value={plantForm.materials}
                                    onChange={(e) => setPlantForm({...plantForm,materials:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="rating"
                                    value={plantForm.rating}
                                    onChange={(e) => setPlantForm({...plantForm,rating:e.target.value})}
                                    className="border p-3 rounded-xl" />

                                    <input
                                    placeholder="Image Url"
                                    value={plantForm.imageUrl}
                                    onChange={(e) => setPlantForm({...plantForm,imageUrl:e.target.value})}
                                    className="border p-3 rounded-xl" />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => { setShowPlantModal(false);setPlantForm({
                                    name:"",
                                    shortDescription:"",
                                    longDescription:"",
                                    price:"",
                                    stockQuantity:"",
                                    sizes:"",
                                    colors:"",
                                    materials:"",
                                    imageUrl:""
                                })}}
                                className="px-5 py-2 border rounded-xl">
                                    Cancel
                                </button>
                                <button onClick={createPlant}
                                className="bg-green-700 text-white px-6 py-2 rounded-xl">
                                    Save Plant
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdminDashboard;