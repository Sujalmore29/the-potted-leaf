import { Leaf, UserCircle } from 'lucide-react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

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

                    <button onClick={() => scrollToSection("plant-care")} className=' hover:text-green-700 transition'>
                        Plant Care
                    </button>

                    <button onClick={() => scrollToSection("contact")} className=' hover:text-green-700 transition hover:underline-offset-2'>
                        Contact
                    </button>
                </div>
                <div>
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