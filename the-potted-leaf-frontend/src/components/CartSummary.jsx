import React from 'react'

const CartSummary = ({ cart  }) => {

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className='bg-white rounded-2xl shadow-md p-6 sticky top-28'>
        <h2 className='text-xl font-bold mb-5'>
            Order Summary
        </h2>

        <div className='space-y-3'>
            <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className='flex justify-between'>
                <span>Shipping</span>
                <span>₹0.00</span>
            </div>

            <div className='flex justify-between mt-4'>
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>
        </div>
    </div>
  )
}

export default CartSummary