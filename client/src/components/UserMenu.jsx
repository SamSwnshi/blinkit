import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles
import Divider from "./Divider";
import SummaryApi from "../common/SummaryApi";
import { logout } from '../store/userSlice';
import Axios from "../utils/config";

const UserMenu = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      console.log("logout", response);

      if (response.data.success) {
        if(close){
          close()
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

  return (
    <div className="items-center">
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        {(user.name || user.mobile?.toString()).toUpperCase()}
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        <Link className="px-2 hover:bg-orange-200 py-1">My Orders</Link>
        <Link className="px-2 hover:bg-orange-200 py-1">Save Address</Link>
        <button onClick={handleLogout} className="text-left px-2 hover:bg-orange-200 py-1">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
