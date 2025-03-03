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
   

}

export default SummaryApi;