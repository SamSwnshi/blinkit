import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/config";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "../components/Loading";
import ProductAdminCard from "../components/ProductAdminCard"

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: 1,
          limit: 20,
          search: search,
        },
      });

      const { data: responseData } = response;
      console.log("from ADMIN", response.data.data);
      console.log("Page:", page, "Total Pages:", responseData.totalNoPage);
    console.log("Products Fetched:", responseData.data.length);

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage || 1);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page,search]);

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300);

    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className='p-3 bg-green-800 text-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full min-w-32 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
          <IoSearchOutline size={25} className="text-black"/>
          <input
            type='text'
            placeholder='Search product here ...'
            className='h-full w-full text-black  outline-none bg-transparent'
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      <div className='p-4 '>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 cursor-pointer  md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {
              productData.map((p, index) => {
                return (
                  <ProductAdminCard data={p} fetchProductData={fetchProductData} />
                )
              })
            }
          </div>
        </div>

        <div className='flex justify-between my-4 '>
          <button onClick={handlePrevious} className="rounded-sm text-white bg-green-800 px-4 py-1 hover:bg-green-600 cursor-pointer hover:text-black">Previous</button>
          <button className='w-full '>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className="rounded-sm text-white bg-green-800 px-4 py-1 hover:bg-green-600 cursor-pointer hover:text-black">Next</button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
