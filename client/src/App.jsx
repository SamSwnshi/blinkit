import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/config";
import SummaryApi from "./common/SummaryApi";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile"

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    // console.log(userData)
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
    fetchCategory();
    fetchUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[80vh] tracking-wider">
        <Outlet />
      </main>
      <Footer />
      <Toaster />

      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  );
};

export default App;
