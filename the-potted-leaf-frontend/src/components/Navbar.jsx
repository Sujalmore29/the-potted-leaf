import { Leaf, UserCircle } from 'lucide-react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { motion, scale } from 'motion/react';

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
            { /* Logo */}
            <div className='flex items-center gap-2 text-green-800 font-bold text-xl cursor-pointer'
                onClick={() => scrollToSection("home")}>
                    <Leaf size={24}/>
                    The Potted Leaf
            </div>

                {/* Navigation Links */}
                <div className='flex  items-center gap-8 text-gray-700 font-medium'>
                    <button onClick={() => scrollToSection("home")} className=' hover:text-green-700 transition'>
                        Home
                    </button>

                    <button onClick={() => scrollToSection("shop")} className=' hover:text-green-700 transition'>
                        Shop
                    </button>

                    <button onClick={() => scrollToSection("why-us")} className=' hover:text-green-700 transition'>
                        Why Us
                    </button>

                    <button onClick={() => scrollToSection("faqs")} className=' hover:text-green-700 transition'>
                        FAQS
                    </button>

                    <button onClick={() => scrollToSection("contact")} className=' hover:text-green-700 transition hover:underline-offset-2'>
                        Contact
                    </button>
                </div>
                <div className='flex item-center gap-2'>
                    {/* Cart Button */ }
                    <motion.button 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => navigate("/cart")}
                    className=' text-gray-500 px-5 py-2 rounded-lg mr-5 hover:text-gray-800
                     transition'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    </motion.button>
                    {/* Profile Button */ }
                    <button onClick={() => navigate("/profile")}
                    className='flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition'>
                        <UserCircle size={20} />
                        Profile
                    </button>
                </div>
        </div>
    </nav>
  )
}

export default Navbar