import React from 'react'
import {motion} from "motion/react";
import { Minus, Trash2 } from 'lucide-react';
import { Plus } from '@boxicons/react';
const CartItem = ({
    item,
    increaseQty,
    decreaseQty,
    removeItem,
}) => {
  return (
    <motion.div
        className='bg-white rounded-2xl p-4 shadow-sm border flex gap-4'>
            <img src={`/assets/plants/${item.imageUrl}`} alt={item.plantName} className='w-28 h-28 object-cover rounded-xl' />

            <div className="flex-1">
                <h3 className='text-lg font-semibold text-green-800'>
                    {item.plantName}
                </h3>

                <p className='text-gray-500 text-sm mt-1'>Size : {item.selectedSize}
                </p>

                <p className='text-gray-500 text-sm'>
                    Color : {item.selectedColor}
                </p>

                <p className='text-gray-500 text-sm'>
                    Material : {item.selectedMaterial}
                </p>

                <p className='mt-2 text-green-700 font-bold'>
                    ₹{item.price}
                </p>
            </div>

            <div className='flex flex-col justify-between'>
                
                <div className='flex items-center mt-5 gap-4 border rounded-full px-3 py-2'>
                    
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    disabled={item.quantity===1} 
                    onClick={() => decreaseQty(item.cartItemId)}>
                        <Minus size={18} />
                    </motion.button>

                    <span>{item.quantity}</span>

                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} disabled={item.quantity>=item.stockQuantity}  
                    onClick={() => increaseQty(item.cartItemId)}>
                        <Plus size={18} />
                    </motion.button>
                </div>
                <div className='flex bg-amber-400'>
                    {item.stockQuantity <= 5 && item.stockQuantity > 0 && <p className='text-orange-500 text-sm'>Only {item.stockQuantity} left in stock!</p>}

                    {item.stockQuantity === 0 && <p className='text-red-600 text-sm'>Out Of Stock</p>}
                </div>
                <div className='flex  justify-center'>
                <div className='w-10 h-10 flex items-center justify-center  '>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeItem(item.cartItemId)}>
                    <Trash2 className='text-red-500' />
                </motion.button>
                </div>
                </div>
            </div>
    </motion.div>
  )
}

export default CartItem