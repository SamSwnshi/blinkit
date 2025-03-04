export const baseURL =import.meta.env.VITE_API_URL;

const SummaryApi = {
    register: {
        url : '/api/user/register',
        method: 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    logout : {
        url : "/api/user/logout",
        method : 'get'
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : 'put'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : "get",
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addCategory: {
        url: "api/category/add-category",
        method: "post"
    },
    uploadImage : {
        url: "/api/file/upload",
        method: "post"
    },
    getCategory : {
        url : '/api/category/get',
        method : 'get'
    },
    updateCategory : {
        url : '/api/category/update',
        method : 'put'
    },
    deleteCategory : {
        url : '/api/category/delete',
        method : 'delete'
    },
    
   

}

export default SummaryApi;