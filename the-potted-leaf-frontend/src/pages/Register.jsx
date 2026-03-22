import axios from '../api/axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            await axios.post("/auth/register", {
            name,
            email,
            password,
        });

        toast.success("Registration Successfull 🌿");
        navigate("/login");
        } catch(err){
            toast.error("Registration failed");
        }
    };

  return (
    <div className='min-h-screen items-center flex justify-center bg-green-50'>
        <div className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-md'>
            <h2 className='text-3xl font-bold text-green-800 text-center'>
                Create Account 🌱
            </h2>

            <form className='mt-6 space-y-4'>
                <input
                    type='text'
                    placeholder='Name'
                    className='w-full p-3 border rounded-lg focus:outline-green-600'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <input
                    type='email'
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
                    onClick={handleRegister}
                    className='w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition'>
                        Sign Up
                    </button>
            </form>

            <p className='mt-4 text-center text-gray-600'>
                Already have an account?{" "}
                <Link to={"/login"} className='text-green-700 font-semibold'>Login</Link>
            </p>
        </div>
    </div>
  )
}

export default Register