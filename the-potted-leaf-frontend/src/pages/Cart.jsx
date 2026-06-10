import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import {motion} from "motion/react";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import CartSummary from '../components/CartSummary';
import Footer from '../components/Footer';

const Cart = () => {

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try{
      const res = await axios.get("/cart/get-cart");
      setCart(res.data);
    } catch (err) {
      toast.error("Failed to load cart");
    }
  };
    
  const increaseQty = async (id) => {
    try{
      const item = cart.find(
        item => item.cartItemId === id
      );

      await axios.put(`/cart/update-quantity/${id}`, {
        quantity: item.quantity + 1
      });

      setCart(prev =>
        prev.map(item => 
          item.cartItemId === id
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
        )
      );

    }catch(err) {
      toast.error("Failed to update quantity");
    }
  }

  const decreaseQty = async (id) => {
    try{
      const item = cart.find(
        item => item.cartItemId === id
      );

      if (item.quantity <= 1) {
        return;
      }

      await axios.put(`/cart/update-quantity/${id}`, {
        quantity: item.quantity - 1
      });

      setCart(prev =>
        prev.map(item => 
          item.cartItemId === id
          ? {
            ...item,
            quantity: item.quantity - 1
          }
          : item
        )
      );

    }catch(err) {
      toast.error("Failed to update quantity");
    }
  }


  const removeItem = async (id) => {
    try{
      await axios.delete(`/cart/remove/${id}`);
    
      setCart(prev =>
        prev.filter(item => 
          item.cartItemId !== id
        )
      )
    } catch (err) {
      toast.error("Failed to remove item");
    }
  }

  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto px-6 py-12 mt-10'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-4xl font-bold text-green-800 mb-10'>
            Shopping Cart
          </motion.h1>

          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-5'>
              {cart.map(item => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeItem={removeItem}
                  />
              ))}
            </div>

            <div>
              <CartSummary cart={cart} />

              <button onClick={() => navigate("/checkout")}
                className='w-full mt-5 bg-green-700 text-white py-4 rounded-xl hover:bg-green-800'>
                  Proceed To Checkout
                </button>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart