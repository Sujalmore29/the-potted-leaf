import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import Footer from '../components/Footer';

const Orders = () => {

    const navigate = useNavigate();
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('ALL');
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get("orders/getOrders").then(res => {
            setOrders(res.data);
            setLoading(false);
        })
    },[])

    const filtered = orders.filter(order => {
        const matchStatus = status === 'ALL' || order.status === status;
        const matchSearch = order.plantName.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    })

  return (
    <div>
        <Navbar />
        <div className='min-h-screen bg-green-50 py-10 px-8 mt-16'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white rounded-3xl shadow-lg p-8'>
                        <h1 className='text-4xl font-bold text-green-700'>
                            My Orders
                        </h1>
                        <div className='flex flex-wrap gap-4 mt-8'>
                            <input
                                placeholder='Search Plant'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='border p-3 rounded-xl w-80' />
                                <select 
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className='border rounded-xl p-3'>
                                        <option>ALL</option>

                                        <option>PAID</option>

                                        <option>PROCESSING</option>

                                        <option>SHIPPED</option>

                                        <option>DELIVERED</option>

                                        <option>CANCELLED</option>
                                    </select>
                        </div>
                        <div className='space-y-6 mt-8'>
                            {loading?
                                <h2>Loading...</h2> : filtered.length === 0 ?
                                <h2>No Orders Found</h2> :
                                filtered.map(order => (
                                    <OrderCard 
                                        key={order.orderId}
                                        order={order}
                                        navigate={navigate} />
                                ))}
                        </div>
                    </motion.div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Orders