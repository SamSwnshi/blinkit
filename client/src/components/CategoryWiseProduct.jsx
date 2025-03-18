import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosError.js";
import Axios from "../utils/config.js";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CardProduct from "./CardProduct.jsx";
import { useSelector } from "react-redux";
import CardLoading from "./CartLoading.jsx";
import { valideURLConvert } from "../utils/validateURLConvert.js";

const CategoryWiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardNumber = new Array(6).fill(null);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const containerRef = useRef();

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

  // const handleScrollRight = () => {
  //   containerRef.current.scrollLeft += 200;
  // };

  // const handleScrollLeft = () => {
  //   containerRef.current.scrollLeft -= 200;
  // };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    return url;
  };
  const redirectURL = handleRedirectProductListpage();
  return (
    <div className="">
      <div className="container mx-auto p-4 flex items-center justify-between gap-4  mt-2 ">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={redirectURL} className="text-green-800 hover:text-green-400 ">
          See All
        </Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth "
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
      {/* <div className="w-full left-0 right-0 container mx-auto border-2  px-2  absolute hidden lg:flex justify-between">
        <button
          onClick={handleScrollLeft}
          className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleScrollRight}
          className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
        >
          <FaAngleRight />
        </button>
      </div> */}
    </div>
  );
};

export default CategoryWiseProduct;
