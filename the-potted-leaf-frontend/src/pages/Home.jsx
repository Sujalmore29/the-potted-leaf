import React, { useEffect, useState } from 'react'
import {motion} from "motion/react";
import ProductCard from '../components/ProductCard';
import heroimg from '../assets/heroimgcropped.png'
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import WhyChoose from '../components/WhyChoose';
import secondHeroImg from '../assets/indoor-outdoor-bg-image.png';
import indoorImg from '../assets/indoor-plants.png';
import outdoorImg from '../assets/outdoor-plants.png';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const Home = () => {

    const navigate = useNavigate();

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios.get("/plant/getAllPlants")
        .then(res => {setPlants(res.data)})
        .catch(err => console.error(err));
    }, []);
  return (
    <div>
        <Navbar />
        <Hero />
        <WhyChoose />

        { /* Product Grid */ }
        <section id="shop" className='max-w-7xl mx-auto px-4 py-12 bg-green-600/10 rounded-lg mt-12'>
            <h2 className='text-3xl font-bold mb-10 text-center text-green-800'>Our Plants</h2>
            <div className='grid md:grid-cols-4 gap-8'>
                {plants.map((plant) => (
                    <ProductCard key={plant.id} plant={plant} />
                ))}
            </div>
        </section>
        <section className='relative py-28'>

            {/* Background Image */}
            <div className='absolute inset-0 bg-cover bg-center'
                style={{
                    backgroundImage:
                    `url('${secondHeroImg}')`
                }}
            />

            { /* Dark overlay */ }
            <div className='absolute inset-0 bg-black/30 backdrop-blur-sm'></div>    

            <div className='relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10'>

                {/* Indoor Card */}
                <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-10 flex items-center justify-between gap-10'>
                    <div className='max-w-md'>
                        <span className='text-sm bg-white/40 px-4 py-1 rounded-full text-white font-bold'>
                            Indoors
                        </span>

                        <h3 className='text-3xl font-bold text-white mt-4'>Low-Maintenance Greens</h3>

                        <p className='text-white/90 mt-4'>
                        Elevate your interior with easy-care indoor plants that purify air and bring calm to your living space.</p>
                    </div>

                    <div className='w-48 h-48 flex itmes-center justify-center bg-white/30 rounded-2xl p-4'>
                        <img src={`${indoorImg}`} className='w-full h-full object-cover rounded-2xl'/>
                    </div>
                </div>

                    {/* Outdoor Card */}
                    <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-10 flex items-center justify-between gap-10'>
                    <div className='max-w-md'>
                        <span className='text-sm bg-white/40 px-4 py-1 rounded-full text-white font-bold'>Outdoors</span>

                        <h3 className='text-3xl font-bold text-white mt-4'>
                            Garden-Ready Plants
                        </h3>

                        <p className='text-white/90 mt-4'>
                        Bring life to your outdoor space with vibrant sun-loving plants perfect for patios and gardens.
                        </p>
                    </div>

                    <div className='w-48 h-48 flex items-center justify-center bg-white/30 rounded-2xl p-4'>
                        <img src={`${outdoorImg}`}
                    className='w-full h-full object-cover rounded-2xl'/>
                    </div>
                </div>
            </div>
        </section>
        <section id = "faqs">
            <FAQ />
        </section>
        <section id="contact">
            <Footer />
        </section>
    </div>
  );
}

export default Home