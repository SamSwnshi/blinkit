import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosError.js";
import Axios from "../utils/config.js";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CardProduct from "./CardProduct.jsx";
import { useSelector } from "react-redux";
import CardLoading from "./CartLoading.jsx";

const CategoryWiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardNumber = new Array(6).fill(null)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const containerRef = useRef()

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      console.log(response.data);

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);
  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link className="text-green-600 hover:text-green-400">See All</Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategorywiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + "CategorywiseProductDisplay" + index}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
        <button className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full">
          <FaAngleLeft />
        </button>
        <button className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
