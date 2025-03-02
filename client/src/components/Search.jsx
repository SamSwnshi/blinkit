import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import {useLocation, useNavigate,Link} from "react-router-dom"
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])
    const searchPage = () =>{
        navigate("/search")
    }


    return (
        <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-blue-200 '>
           { (isMobile && isSearchPage ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 '>
                        <FaArrowLeft size={20}/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                        <IoSearch size={22}/>
                    </button>
                )}

            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        //NOTE - not is search page
                        <div onClick={searchPage}  className='w-full h-full flex items-center'>
                        <TypeAnimation
                            sequence={[
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "panner"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "chips"',
                            ]}
                            wrapper='span'
                            speed={30}
                            repeat={Infinity}
                        />
                    </div>
                    ): (
                        <div className='w-full  h-full'>
                            <input type= "text" placeholder='Search for items' className='bg-transparent w-full h-full outline-none' autoFocus/>
                        </div>
                    )
                }
            </div>

           
        </div>
    )
}

export default Search
