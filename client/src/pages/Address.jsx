import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/config";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id,
        },
      });
      if (response.data.success) {
        toast.success("Address Remove");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="">
      <div className="bg-green-800 text-white  shadow-lg px-2 py-2 flex justify-between gap-4 items-center ">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border bg-white text-black border-blue-200 hover:bg-yellow-500 px-3 py-2 cursor-pointer rounded"
        >
          Add Address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {addressList.map((address, index) => {
          return (
            <div
              key={index}
              className={`border rounded p-3 flex gap-3 bg-white ${
                !address.status && "hidden"
              }`}
            >
              <div className="w-full">
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>
              <div className=" grid gap-10">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="w-12 bg-green-200 p-1 rounded flex items-center justify-center hover:text-white hover:bg-green-600 cursor-pointer duration-150 hover:scale-110"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className="w-12 flex items-center justify-center bg-red-200 p-1 rounded duration-150 hover:text-white hover:bg-red-600 cursor-pointer hover:scale-110"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
        >
          Add address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {OpenEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
