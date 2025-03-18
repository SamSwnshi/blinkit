import React from "react";
import { useForm } from "react-hook-form";
import Axios from "../utils/config";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";


const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext();
  const onSubmit = async (data) => {
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="bg-black  fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto">
      <div className="bg-green-800 p-4 w-full max-w-lg mt-8 mx-auto rounded">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold text-white">Add Address</h2>
          <button onClick={close} className="hover:text-white">
            <IoClose size={25} />
          </button>
        </div>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="addressline" className="text-white">Address Line :</label>
            <input
              type="text"
              id="addressline"
              className="border bg-blue-50 p-2 rounded"
              {...register("addressline", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city" className="text-white">City :</label>
            <input
              type="text"
              id="city"
              className="border bg-blue-50 p-2 rounded"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="state" className="text-white">State :</label>
            <input
              type="text"
              id="state"
              className="border bg-blue-50 p-2 rounded"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="pincode" className="text-white">Pincode :</label>
            <input
              type="text"
              id="pincode"
              className="border bg-blue-50 p-2 rounded"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country" className="text-white">Country :</label>
            <input
              type="text"
              id="country"
              className="border bg-blue-50 p-2 rounded"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile" className="text-white">Mobile No. :</label>
            <input
              type="text"
              id="mobile"
              className="border bg-blue-50 p-2 rounded"
              {...register("mobile", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="bg-white w-full rounded-sm  py-2 font-semibold mt-4 hover:bg-black hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
