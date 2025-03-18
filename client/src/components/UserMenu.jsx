import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Divider from "./Divider";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import Axios from "../utils/config";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div className="items-center">
      <div className="font-semibold ">My Account</div>
      <div className="text-sm flex items-center gap-2 mt-1">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name.toUpperCase() || user.mobile}{" "}
          <span className="text-medium text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} className="hover:scale-130 duration-120 hover:text-green-800"/>
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
          >
            Product
          </Link>
        )}
        <Link
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
        >
          My Orders
        </Link>
        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-green-800 hover:text-white py-1 hover:scale-105 duration-120"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
