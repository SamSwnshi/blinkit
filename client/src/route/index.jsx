import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminPermision from "../layout/AdminPermisssion";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserMenuPage from "../pages/UserMenuPage";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ProductListPage from "../pages/ProductListPage";
import CartMobile from "../components/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Address from "../pages/Address";
import DisplayCartItem from "../components/DisplayCartItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user",
        element: <UserMenuPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <Category />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <SubCategory />
              </AdminPermision>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermision>
                <UploadProduct />
              </AdminPermision>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermision>
                <ProductAdmin />
              </AdminPermision>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobile />,
      },
      {
        path: "cartitems",
        element: <DisplayCartItem />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);

export default router;
