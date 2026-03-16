import { UserCircle } from 'lucide-react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='w-full bg-green-50 shadow-md '>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
            { /* Logo */}
            <Link to="/"
                className='text-2xl font-bold text-green-800 tracking-wide'>
                    🌿 ThePottedLeaf
                </Link>

                {/* Navigation Links */}
                <div className='flex items-center gap-8'>
                    <Link to="/"
                    className='text-green-800 text-lg font-medium hover:text-green-600 transition'>
                        Home
                    </Link>

                    {/* Profile Button */ }
                    <button onClick={() => navigate("/profile")}
                    className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition'>
                        <UserCircle size={20} />
                        Profile
                    </button>
                </div>
        </div>
    </nav>
  )
}

export default Navbar