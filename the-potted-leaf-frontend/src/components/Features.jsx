import { Headphones, Icon, Truck, Wallet } from 'lucide-react'
import { motion } from "motion/react"

const features = [
    {
        icon: <Truck className='w-8 h-8 text-green-600' />,
        title: "Free Shipping",
        desc: "Free shipping for orders above ₹2500"
    },
    {
        icon: <Wallet className='w-8 h-8 text-green-600' />,
        title: "Flexible Payment",
        desc: "Multiple secure payment options including credit/debit cards, UPI and net banking"
    },
    {
        icon: <Headphones className='w-8 h-8 text-green-600' />,
        title: "24x7 Support",
        desc: "We Support online all days"
    }
];
const Features = () => {
  return (
    <div className='bg-white py-10 mt-12 rounded-2xl shadow-sm'>
        <div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {features.map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className='flex flex-col items-center'>
                        <div className='bg-green-100 p-4 rounded-full mb-4'>
                            {item.icon}
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>
                            {item.title}
                        </h3>
                        <p className='text-gray-500 text-sm mt-1'>
                            {item.desc}
                        </p>
                    </motion.div>
            ))}
        </div>
    </div>
  )
}

export default Features