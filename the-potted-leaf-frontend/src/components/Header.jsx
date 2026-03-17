import { FaShoppingCart,FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
    const [theme, setTheme] = useState(ThemeContext);
  return (
    <header className='bg-botanical-lightBg shadow-md sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto flex justify-between items-center p-4'>
            <Link to="/" className='text-2xl font-bold text-botanicalPrimary dark:text-luxury-gold'>
            The Potted Leaf 🌿</Link>

            <nav className='flex items-center gap-6 text-gray-700'>

                <motion.div whileHover={{scale: 1.2}}>
                    <FaShoppingCart className="cursor-pointer" />
                </motion.div>

                <motion.div whileHover={{scale: 1.2}}>
                    <FaUser className="cursor-pointer" />
                </motion.div>
            </nav>
        </div>
    </header>
  );
}

export default Header