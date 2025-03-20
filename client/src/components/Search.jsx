import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const searchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-48  min-w-[250px] sm:min-md lg:min-w-[420px] h-11 lg:h-12 rounded-lg border border-gray-400  flex items-center text-neutral-500 bg-slate-50">
        <div>
          {isMobile && isSearchPage ? (
            <Link
              to={"/"}
              className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-blue-200 bg-white rounded-full shadow-md"
            >
              <FaArrowLeft size={20} />
            </Link>
          ) : (
            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-blue-200">
              <IoSearch size={22} />
            </button>
          )}
        </div>
        <div className="w-full h-full ">
          {!isSearchPage ? (
            //not in search page
            <div
              onClick={searchPage}
              className="w-full h-full flex items-center"
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
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
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            //when i was search page
            <div className="w-full  h-full  ">
              <input
                type="text"
                placeholder="Search for atta dal and more."
                autoFocus
                value={searchText}
                className="  w-full h-full  outline-none px-2"
                onChange={handleOnChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
