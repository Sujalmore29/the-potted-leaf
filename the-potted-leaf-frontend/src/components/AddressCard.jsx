import React from 'react'

const AddressCard = ({ order }) => {
  return (
    <div className='bg-green-50 rounded-2xl p-6'>
        <h2 className='font-bold text-xl mb-4'>
            Delivery Address
        </h2>
        <p>{order.streetAddress}</p>
        <p>
            {order.city},
            {order.state}
        </p>

        <p>
            {order.country}
        </p>
        <p>
            {order.zipCode}
        </p>
    </div>
  )
}

export default AddressCard