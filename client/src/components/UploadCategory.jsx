import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from "../utils/config";
import SummaryApi from '../common/SummaryApi';
import { toast } from 'react-toastify';  
import AxiosToastError from '../utils/AxiosError';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.image) {
            toast.error("Please enter a category name and upload an image.");
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data
            });
            const { data: responseData } = response;
            console.log("response from upload", response);
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            console.log("Uploading", file);
            const response = await uploadImage(file);
            console.log("upload", response);
            const { data: ImageResponse } = response;

            if (!ImageResponse?.data?.url) {
                throw new Error("Failed to upload image.");
            }

            setData((prev) => ({
                ...prev,
                image: ImageResponse.data.url
            }));
            toast.success("Image uploaded successfully!");  
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-green-800 max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold text-white'>Category</h1>
                    <button onClick={close} className='w-fit block ml-auto hover:text-white'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label id='categoryName' className='text-white'>Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p className='text-white'>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {
                                    data.image ? (
                                        <img
                                            alt='category'
                                            src={data.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadCategoryImage'>
                                <div className={`
                                    ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100"}  
                                    px-4 py-2 rounded cursor-pointer border font-medium
                                `}>
                                    Upload Image
                                </div>
                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>

                    <button
                        className={`
                        ${data.name && data.image ? "bg-white text-black hover:bg-black hover:text-white" : "bg-white"}
                        py-2 font-semibold 
                        `}
                    >Add Category</button>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel;
