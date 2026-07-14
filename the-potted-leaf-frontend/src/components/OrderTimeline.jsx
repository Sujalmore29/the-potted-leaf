import { CheckCircle } from 'lucide-react';
import React from 'react'

const OrderTimeline = ({ status }) => {

    const steps = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"];

    const current = steps.indexOf(status);
  return (
    <div className='space-y-6'>
        {
            steps.map((step,index)=>(
                <div 
                    key={step}
                    className='flex gap-4 items-center'>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index<=current?"bg-green-600 text-white":"bg-gray-300"}`}>
                            <CheckCircle size={18} />
                        </div>
                        <div>
                            <h3 className='font-semibold'>{step}</h3>
                        </div>
                </div>
            ))
        }
    </div>
  )
}

export default OrderTimeline