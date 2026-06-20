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
    const [selectedSize, setselectedSize] = useState("");
    const [selectedColor, setselectedColor] = useState("");
    const [selectedMaterial, setselectedMaterial] = useState("");

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
        if(!selectedSize || !selectedMaterial || !selectedColor){
            return toast.error("Please select size, material and color before proceeding.");
        }
        try{
            const res = await axios.post(`payment/create-session/${plant.id}`,{
                size: selectedSize,
                color: selectedColor,
                material: selectedMaterial});
            window.location.href = res.data; // stripe checkout URL
        } catch(err) {
            toast.error("Failed to initiate purchase. Please try again later.");
        }
    }

    const addToCart = async () => {
        if(!selectedSize || !selectedMaterial || !selectedColor){
            return toast.error("Please select size, material and color before proceeding.");
        }
        try{
            await axios.post("/cart/add-to-cart",{
                plantId: plant.id,
                quantity: 1,
                selectedSize,
                selectedColor,
                selectedMaterial
            })
            toast.success("Item added to cart!");
        } catch(err) {
            toast.error("Failed to add item to cart. Please try again later.");
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

                <button onClick={addToCart} className='bg-yellow-400 text-gray-800 text-shadow-md px-8 py-3 rounded-xl  w-md hover:bg-yellow-500 transition'>
                    Add to Cart
                </button>
                <button onClick={handleBuyNow}
                    className='bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition w-md'>
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
                    <h3 className='font-semibold text-lg mb-2'>Pot Size</h3>
                    <div className='flex gap-3'>
                        {plant?.sizes?.map((size) => (
                            <button 
                                key={size}
                                onClick={() => setselectedSize(size)}
                                className={`px-4 py-2 rounded-full border ${
                                    selectedSize === size
                                    ? "bg-yellow-400" 
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Pot Material</h3>
                    <div className="flex gap-3">
                        {plant?.materials?.map((mat) => (
                            <button
                                key={mat}
                                onClick={() => setselectedMaterial(mat)}
                                className={`px-4 py-2 rounded-full border ${
                                    selectedMaterial === mat
                                    ? "bg-yellow-400"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                            {mat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='mt-6'>
                    <h3 className='font-semibold text-lg mb-2'>Pot Color</h3>
                    <div className='flex gap-3'>
                        {plant?.colors?.map((color) => (
                            <div
                                key={color}
                                onClick={() => setselectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                                    selectedColor === color
                                    ? "border-black"
                                    : "border-gray-300"
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
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