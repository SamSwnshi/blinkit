import React from 'react'
import Axios from './config'
import SummaryApi from '../common/SummaryApi';


const fetchUserDetails = async() => {

    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        
        
        return response.data
    } catch (error) {
        console.log(error.message,error)
    }
  
}

export default fetchUserDetails
