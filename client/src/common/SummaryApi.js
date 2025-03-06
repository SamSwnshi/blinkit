export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  addSubcategory: {
    url: "api/subcategory/add-subcategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "get",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/getProduct",
    method: "get",
  },
  getProductByCategory: {
    url: "/api/product/getProductCategory",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/getProductCategorySubCategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/getProductDetails",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/product/updateProduct",
    method: "put",
  },
  deleteProduct: {
    url: "/api/product/deleteProduct",
    method: "delete",
  },
  searchProduct: {
    url: "/api/product/getProductSearch",
    method: "post",
  },
};

export default SummaryApi;
