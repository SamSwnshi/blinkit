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
                toast.error(response.data.message); // ✅ Show error toast
                return;
            }

            if (response.data.message === "Login successfully") {
                toast.success("Logged in successfully! 🎉"); // ✅ Show success toast
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                    const userDetails = await fetchUserDetails();
                    dispatch(setUserDetails(userDetails.data))

                setData({ email: "", password: "" });

                setTimeout(() => navigate("/"), 1500); // ✅ Delay navigation slightly
            }
        } catch (error) {
            AxiosToastError(error); // ✅ Show API error
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            {/* ✅ Toast Notification Container */}
            <ToastContainer position="top-center" autoClose={3000} />

            <div className='bg-sky-300 my-4 w-full max-w-lg mx-auto rounded p-7'>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
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

                    <button
                        disabled={!isValid}
                        className={`${isValid ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
                    >
                        Login
                    </button>
                </form>

                <p className='flex justify-center'>
                    Don't have an account?  
                    <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800 ml-1'>
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
