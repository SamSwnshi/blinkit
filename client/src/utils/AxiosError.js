import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AxiosToastError = (error)=>{
    toast.error(
        error?.response?.data?.message
    )
}

export default AxiosToastError