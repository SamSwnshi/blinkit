import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../utils/config';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const isValid = Object.values(data).every(el => el.trim() !== "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message); 
                return;
            }
            console.log(response.data,"from login")
            console.log(response.data.success,"from login")

            if (response.data.success) {
                toast.success("Logged in successfully! 🎉");  
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                    const userDetails = await fetchUserDetails();
                    dispatch(setUserDetails(userDetails.data))

                setData({ email: "", password: "" });

                setTimeout(() => navigate("/"), 1000); 
            }
        } catch (error) {
            AxiosToastError(error); 
        }
    };

    return (
        <section className='w-full container mx-auto px-2  py-5'>
            <div className='bg-green-800 my-4 w-full max-w-lg mx-auto rounded p-7'>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email' className='text-white'>Email:</label>
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
                        <label htmlFor='password' className='text-white'>Password:</label>
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

                    <button
                        disabled={!isValid}
                        className={`${isValid ? "bg-white  hover:text-white hover:bg-black" : "bg-gray-500"} text-black py-2 rounded font-semibold my-3 tracking-wide`}
                    >
                        Login
                    </button>
                </form>

                <p className='flex justify-center text-white'>
                    Don't have an account?  
                    <Link to={"/register"} className='font-semibold text-green-300 hover:text-white ml-1'>
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
