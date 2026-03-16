import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/login",{
                email,
                password,
            });

            login(res.data);
            navigate("/");
            toast.success("Login successfull");
        } catch(err) {
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-green-50'>
        <div className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-md'>
            <h2 className='text-3xl font-bold text-green-800 text-center'>
                Welcome Back 🌿
            </h2>

            <form className='mt-6 space-y-4'>
                <input 
                    type="email"
                    placeholder='Email'
                    className='w-full p-3 border rounded-lg focus:outline-green-600'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                
                <input
                    type='password'
                    placeholder='Password'
                    className='w-full p-3 border rounded-lg focus:outline-green-600'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                    <button
                        onClick={handleLogin}
                        className='w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition'>
                            Login
                     </button>
            </form>
            <p className='mt-4 text-center text-gray-600'>
                Not Registered?{" "}
                <Link to="/register" className='text-green-700 font-semibold'>
                Sign up 
                </Link>
                <span className='text-gray-600'> here</span>
            </p>
        </div>
    </div>
  );
}

export default Login