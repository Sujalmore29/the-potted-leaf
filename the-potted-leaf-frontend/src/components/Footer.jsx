import { Leaf } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { LuLeaf } from 'react-icons/lu'

const Footer = () => {
  return (
    <footer className='bg-green-50 border-t border-green-100 mt-24'>
        <div className='max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-18'>

            {/* Logo Section */}
            <div>
                <div className='flex items-center gap-2 text-green-800 font-bold text-2xl'>
                    <Leaf size={28}/>
                    The Potted Leaf
                </div>

                <p className='text-gray-600 mt-4'>
                    Bringing nature closer to your home with hand-picked plants
                    that make your space fresh and alive.
                </p>

                <div className='flex gap-4 mt-6 text-green-700'>
                    <FaInstagram size={24}  className='cursor-pointer hover:text-green-900'/>
                    <FaFacebook size={24} className='cursor-pointer hover:text-green-900'/>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M13.68 10.62 20.24 3h-1.55L13 9.62 8.45 3H3.19l6.88 10.01L3.19 21h1.55l6.01-6.99 4.8 6.99h5.24l-7.13-10.38Zm-2.13 2.47-.7-1-5.54-7.93H7.7l4.47 6.4.7 1 5.82 8.32H16.3z"/>
                    </svg> 
                </div>
            </div>
                {/* Quick Links */}
            <div className='px-8'>
                <h4 className='font-semibold text-green-800 mb-4 text-lg'>Quick Links</h4>

                <ul className='space-y-3 text-gray-600'>
                    <li className='hover:text-green-700 cursor-pointer'>Home</li>
                    <li className='hover:text-green-700 cursor-pointer'>Shop</li>
                    <li className='hover:text-green-700 cursor-pointer'>Plant Care</li>
                    <li className='hover:text-green-700 cursor-pointer'>About Us</li>
                </ul>
            </div>

            {/* Customer Support */}
            <div>
                <h4 className='font-semibold text-green-800 mb-4'>Customer Support</h4>

                <ul className='space-y-3 text-gray-600'>
                    <li className='hover:text-green-700 cursor-pointer'>Contact Us</li>
                    <li className='hover:text-green-700 cursor-pointer'>Shipping</li>
                    <li className='hover:text-green-700 cursor-pointer'>Returns</li>
                    <li className='hover:text-green-700 cursor-pointer'>FAQs</li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h4 className='font-semibold tex-green-800 mb-4'>Join Our Newsletter</h4>

                <p className='text-gray-600 mb-4'>
                    Get plant care tips and exclusive offers.
                </p>

                <div className='flex'>
                    <input type='email'
                    placeholder='Your email'
                    className='w-full px-4 py-2 border border-green-200 rounded-l-lg focus:outline-none'/>

                    <button className='bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700'>
                        Join
                    </button>
                </div>
            </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-green-100 py-6 text-center text-gray-500 text-sm'>
            ©{new Date().getFullYear()} ThePottedLeaf. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer