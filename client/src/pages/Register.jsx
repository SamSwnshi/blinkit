import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../utils/config';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const valideValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be the same.");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            });
            console.log(response.data.message)
            if (response?.data?.message === "Already register email") {
                toast.error("This email is already registered. Please use another.");
                return;
            }

            if (response.data.message === "User register successfully") {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                navigate("/login");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <ToastContainer position="top-center" autoClose={3000} />
            
            <div className='bg-sky-300 my-4 w-full max-w-lg mx-auto rounded p-7'>
                <h2 className='text-2xl'>Welcome to Binkeyit</h2>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={!valideValue}
                        className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
                    >
                        Register
                    </button>
                </form>

                <p>
                    Already have an account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
