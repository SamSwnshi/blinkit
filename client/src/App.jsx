import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/config";
import SummaryApi from "./common/SummaryApi";
import { setAllCategory } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data: responseData } = response;
            if (responseData.success) {
              console.log("data from api",responseData.data)
              dispatch(setAllCategory(responseData.data))
                
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
    fetchCategory()
    fetchUser()
  }, [])
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer  position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
