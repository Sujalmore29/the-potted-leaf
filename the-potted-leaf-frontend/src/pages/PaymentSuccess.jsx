import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShoppingBag } from "lucide-react";
import Footer from "../components/Footer";

const PaymentSuccess = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("/orders/latest")
        .then(res => setOrders(res.data))
        .catch(() =>{});
    },[])


    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-green-50 py-12 px-6 mt-15">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y:50 }}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: .6 }}

                        className="bg-white rounded-3xl shadow-xl p-10">
                            <div className="flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{                          type:"spring",
                                        stiffness:100
                                    }}>
                                        <CheckCircle size={90} className="text-green-600" />
                                    </motion.div>

                                    <h1 className="text-4xl font-bold text-green-700 mt-6">Payment Successful!</h1>

                                    <p className="text-gray-500 mt-3 text-lg">Thank you for shopping with The Potted Leaf 🌿</p>
                            </div>
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Recent Orders
                                </h2>
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.orderId}
                                        className="flex justify-between items-center bg-green-50 rounded-2xl p-5">
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    {order.plantName}
                                                </h3>
                                                <p className="text-gray-500">Payment: {order.paymentId}</p>
                                                <p className="text-gray-500">Quantity : {order.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <h3 className="text-xl font-bold text-green-700">
                                                    ₹ {order.price}
                                                </h3>
                                                <p className="text-sm text-gray-500">{order.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center gap-6 mt-12">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: .95 }}
                                    onClick={() => navigate("/orders")}
                                    className="bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
                                        <ShoppingBag />
                                        View Orders
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: .95 }}
                                    onClick={() => navigate("/")}
                                    className="border border-green-700 text-green-700 px-8 py-3 rounded-xl flex items-center gap-2">
                                        Continue Shopping <ArrowRight />        
                                </motion.button>
                            </div>
                        </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentSuccess;