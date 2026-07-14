import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import OrderTimeline from '../components/OrderTimeline';
import AddressCard from '../components/AddressCard';
import Footer from '../components/Footer';

const OrderDetails = () => {

    const {orderId} = useParams();
    const navigate = useNavigate();
    
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/orders/" + orderId).then(res => {setOrder(res.data);
        setLoading(false);
    })
    },[]);

    if(loading){
        return (
            <div className='text-center mt-24'>Loading...</div>
        )
    }

  return (
    <div>
        <Navbar />
        <div className='bg-green-50 min-h-screen py-10 mt-16'>
            <div className='max-w-7xl mx-auto px-6'>
                <motion.div
                    initial={{ opacity: 0,y: 20 }}
                    animate={{ opacity: 1,y: 0 }}
                    className='bg-white rounded-3xl shadow-xl p-10'>
                        <div className='grid lg:grid-cols-2 gap-10'>
                            <div>
                                <img src={`/assets/plants/${order.imageUrl}`}
                                className='rounded-3xl shadow-lg w-full h-105 object-cover' />
                                <div className='mt-8 flex gap-4'>
                                    <button onClick={() => navigate(`/products/${order.plantId}`)}
                                    className='bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2'>
                                        <ShoppingCart />
                                        Buy Again
                                    </button>
                                    {order.status === "DELIVERED" && <button className='border border-green-700 text-green-700 px-6 py-3 rounded-xl flex items-center gap-2'>
                                        <Star />
                                        Review Product
                                    </button>
                                    }
                                </div>
                            </div>
                        <div>
                        <h1 className='text-4xl font-bold text-green-700'>
                            {order.plantName}
                        </h1>
                        <p className='text-2xl mt-4'>
                            ₹ {order.price}
                        </p>
                        <div className='mt-8 space-y-3'>
                            <p>
                                <b>Quantity :</b>
                                {order.quantity}
                            </p>
                            <p>
                                <b>Pot Size :</b>
                                {order.potSize}
                            </p>
                            <p>
                                <b>Pot Color :</b>
                                {order.potColor}
                            </p>
                            <p>
                                <b>Pot Material :</b>
                                {order.potMaterial}
                            </p>
                            <p>
                                <b>Payment ID :</b>
                                {order.paymentId}
                            </p>
                            <p>
                                <b>Status :</b>
                                <span className='text-green-700 font-semibold'>{order.status}</span>
                            </p>
                        </div>
                        <div className='mt-10'>
                            <OrderTimeline status={order.status} />
                        </div>
                        </div>
                        </div>
                        <div className='grid md:grid-cols-2 gap-10 mt-10'>
                            <AddressCard order={order} />
                            <div className='bg-green-50 rounded-2xl p-6'>
                                <h2 className='font-bold text-xl mb-4'>
                                    Order Summary
                                </h2>
                                <p>Plant : {order.plantName}</p>
                                <p>Quantity : {order.quantity}</p>
                                <p>Price : ₹ {order.price}</p>
                                <p>Total : ₹ {order.price*order.quantity}</p>
                            </div>
                        </div>
                    </motion.div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default OrderDetails