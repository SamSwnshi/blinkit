import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import Axios from "../utils/config";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  const [loading, setLoading] = useState(false);
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  // const allCategory = useSelector(state => state.product.allCategory)

  // useEffect(()=>{
  //     setCategoryData(allCategory)
  // },[allCategory])
  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      console.log("Category", response);
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;
      console.log("from delte", responseData);

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="p-2 h-full bg-green-800 text-white shadow-md flex items-center justify-between ">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border bg-white text-black border-blue-200 hover:bg-yellow-500 px-3 py-2 cursor-pointer rounded "
        >
          Add Category
        </button>
      </div>

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categoryData.map((category, index) => {
          return (
            <div className="w-38 h-64 flex flex-col justify-start rounded shadow-md hover:scale-95 duration-100" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down "
              />
              <div className="items-center h-9 flex gap-2 ">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-300 text-green-600 font-medium py-1 rounded duration-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-300 text-red-600 font-medium py-1 rounded duration-100"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategory
          close={() => setOpenUploadCategory(false)}
          fetchData={fetchCategory}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default Category;
