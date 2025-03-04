import React from 'react';
import Axios from '../utils/config';
import SummaryApi from '../common/SummaryApi';


const UploadImage = async(image) => {
 try {
    const formData = new FormData();

    formData.append("image",image)
    const response = await Axios({
        ...SummaryApi.uploadImage,
        data: formData
    })
    return response
 } catch (error) {
    return error;
 }
}

export default UploadImage

