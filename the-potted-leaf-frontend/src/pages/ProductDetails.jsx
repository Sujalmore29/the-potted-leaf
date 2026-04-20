import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import Features from '../components/Features';

const ProductDetails = () => {
    const {id} = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`/plant/${id}`)
        .then(res => {
            setPlant(res.data);
            setLoading(false);
        })
        .catch((err) => {
            toast.error("Failed to fetch product details. Please try again later.");
        })
    }, [id]);

    const handleBuyNow = async() => {
        try{
            const res = await axios.post(`payment/create-session/${plant.id}`);
            window.location.href = res.data; // stripe checkout URL
        } catch(err) {
            toast.error("Failed to initiate purchase. Please try again later.");
        }
    }

    if(loading) {
        return <div className='text-center mt-20 bg-blue-600'>Loading...</div>
    }
    if(!plant){
        return <div className='text-center mt-20 bg-blue-600'>Plant not found</div>;
    }

  return (
    <div>
        <Navbar />
            <div className="mt-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
            { /* Left - Image */ }
            <div className='flex flex-col gap-6 items-center'>
                <img src={`/public/assets/plants/${plant.imageUrl}`} 
                alt={plant.name}
                className='w-full h-105 object-cover rounded-2xl shadow-xl' />

                <button onClick={handleBuyNow} className='bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition w-1/2'>
                    Buy Now
                </button>
            </div>

            

            { /* Right - Details */ }
            <div>
                <h1 className='text-4xl font-bold text-green-800'>
                    {plant.name}
                </h1>
                <p className='text-2xl mt-4 text-green-700 font-semibold'>
                    ₹{plant.price}
                </p>
                <p className='mt-6 text-gray-600'>
                    {plant.shortDescription}
                </p>

                <div className='mt-6'>
                    <h3 className='font-semibold text-lg'>Description</h3>
                    <p className='mt-2 text-gray-500'>
                        {plant.longDescription}
                    </p>
                </div>

                <div className='mt-6'>
                    <h3 className='font-semibold text-lg'>Pot Color</h3>
                    <p className='mt-2 text-gray-500'>
                        {plant.potColor}
                    </p>
                </div>

                <div className='mt-6'>
                    <h3 className='font-semibold text-lg'>Pot Size</h3>
                    <p className='mt-2 text-gray-500'>
                        {plant.potSize}
                    </p>
                </div>

                <div className='mt-6'>
                    <h3 className='font-semibold text-lg'>Rating</h3>
                    <p className='mt-2 text-gray-500'>
                        {plant.rating}⭐
                    </p>
                </div>

                
            </div>
        </div>
        <Features />
        <ReviewSection plantId={plant.id} />
        <Footer />
    </div>
  )
}

export default ProductDetails