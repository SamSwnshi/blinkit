import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserMenuPage from "../pages/UserMenuPage";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import SaveAddress from "../pages/SaveAddress";
import MyOrder from "../pages/MyOrder";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";

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
        element: <UserMenuPage/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>,
        children: [
          {
            path: "profile",
            element: <Profile/>
          },
          {
            path: "address",
            element: <SaveAddress/>
          },
          {
            path: "myorders",
            element: <MyOrder/>
          },
          {
            path: "category",
            element: <Category/>
          }
          ,{
            path: "subcategory",
            element: <SubCategory/>
          },
          {
            path: "upload-product",
            element: <UploadProduct/>
          },
          {
            path: "product",
            element: <ProductAdmin/>
          }
        ]
      }
    ],
  },
]);

export default router;
