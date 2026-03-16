import { motion } from "motion/react"
import img from "../assets/heroimg/heroimgcrop.png"
const Hero = () => {
  return (
    <section className='relative h-screen w-full overflow-hidden'>
        <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.8 }}
                className="absolute inset-0">
                <img src={`${img}`}
                alt="Indoor Plants"
                className="absolute w-full h-full object-cover" />

                { /* Overlay (optional soft tint) */ }
                <div className="absolute inset-0 bg-green-900/20"></div>

                { /* CONTENT */ }
                <div className="relative max-w-7xl mx-auto px-6 h-9/12 flex flex-col justify-center">

                    <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='text-5xl font-bold text-white leading-tight max-w-2xl mt-2'>
                    Grow your home with <span className='text-green-600'>beautiful plants</span>
                    </motion.h1>

                    <p className='mt-6 text-gray-200 text-lg max-w-xl'>
                    Discover hand-picked indoor plants that make your space calm,fresh and alive.
                    </p>

                    { /* Buttons */ }
                    <div className='flex gap-4 mt-8'>
                        <button className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition'>
                        Shop Plants
                        </button>

                        <button className='border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition'>Learn More</button>
                    </div>
                </div>
                
        

                {/* STATS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6 ">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Stat number="2,500+" label="Happy Customers" />
                        <Stat number="1200+" label="Plants Sold" />
                        <Stat number="150+" label="Plant Varieties" />
                        <Stat number="4.9★" label="Customer Rating" />
                    </div>
                </motion.div>
            </motion.div>
    </section>
  )
}

function Stat({ number,label }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-2xl font-bold text-green-700">
                {number}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
                {label}
            </p>
        </div>
    )
}
export default Hero