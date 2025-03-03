import React, { useEffect, useState } from "react";
import { setUserDetails } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfile from "../components/UserProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchUserDetails from "../utils/fetchUserDetails";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/config";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatar, setOpenProfileAvatar] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;
      console.log(responseData, "Response Data");

      console.log(response.data.message);

      if (responseData.data.message === "Updated successfully") {
        toast.success(responseData.data.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      toast.error("Failed to update profile", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4  ">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Profile Avatar */}
      <div className="w-40 h-40 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatar(true)}
        className="text-sm min-w-20 cursor-pointer border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatar && (
        <UserProfile close={() => setOpenProfileAvatar(false)} />
      )}

      {/* Profile Form */}
      <form className="my-4 grid gap-4 w-full" onSubmit={handleSubmit}>
        <div className="grid w-full">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-blue-200 rounded w-full"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-blue-500 rounded w-full"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid w-full">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-blue-200 rounded w-full"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-black-100 text-primary-200 hover:text-neutral-800 rounded w-full cursor-pointer">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
