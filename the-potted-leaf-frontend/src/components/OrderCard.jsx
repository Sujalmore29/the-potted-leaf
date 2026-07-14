import React from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react';

const OrderCard = ({ order, navigate }) => {

    const badge = () => {
        switch(order.status){

            case "PAID":
                return "bg-green-100 text-green-700";

            case "PROCESSING":
                return "bg-yellow-100 text-yellow-700";

            case "SHIPPED":
                return "bg-blue-100 text-blue-700";

            case "DELIVERED":
                return "bg-green-700 text-white";

            default:
                return "bg-red-100 text-red-700";
        }
    }
  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      className='bg-white rounded-3xl shadow-lg p-6 flex justify-between'>
        <div className='flex gap-5'>
            <img src={`/assets/plants/${order.imageUrl}`}
            className='w-36 h-36 rounded-2xl object-cover' />
            <div>
                <h2 className='text-2xl font-bold'>
                    {order.plantName}
                </h2>
                <p className='mt-2'>
                    ₹ {order.price}
                </p>
                <p>
                    Quantity : {order.quantity}
                </p>
                <p>
                    Size : {order.potSize}
                </p>
                <p>
                    Color : {order.potColor}
                </p>
                <p>
                    Material : {order.potMaterial}
                </p>
                <p className='text-gray-500 mt-2'>
                    Payment ID
                    <br/>
                    {order.paymentId}    
                </p>
            </div>
        </div>
        <div className='flex flex-col justify-between items-end'>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${badge()}`}>
                {order.status}
            </div>
            <div className='text-right'>
                <p>
                    {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                    {order.streetAddress}
                </p>
                <p>
                    {order.city},
                    {order.state}
                </p>
            </div>
            <button onClick={() => navigate(`/orders/${order.orderId}`)}
            className='bg-green-700 text-white px-5 py-2 rounded-xl flex items-center gap-2'>
                <Eye size={18} /> Details
            </button>
        </div>  
    </motion.div>
  )
}

export default OrderCard