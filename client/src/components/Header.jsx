import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupess";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [openCartSection, setOpenCartSection] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state?.user);
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };
  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      <div className="container mx-auto flex items-center px-2 justify-between">
        {/** Logo */}
        <div className="h-full">
          <Link to="/" className="h-full flex justify-center items-center">
            <img
              src={logo}
              width={170}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={120}
              height={60}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
        </div>

        {/** Search Bar (Hide only on the search page) */}

        <div className="container mx-auto px-2">
          <Search />
        </div>

        {/** Login and My Cart */}
        <div className="">
          {/** User Icon (Mobile Only) */}
          <button
            className="text-neutral-600 lg:hidden"
            onClick={handleMobileUser}
          >
            <FaRegCircleUser size={26} />
          </button>

          {/** Desktop User Menu & Cart */}
          <div className="hidden lg:flex items-center gap-10">
            {user?._id ? (
              <div className="relative">
                <div
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className="flex select-none items-center gap-1 cursor-pointer"
                >
                  <p>Account</p>
                  {openUserMenu ? (
                    <GoTriangleUp size={25} />
                  ) : (
                    <GoTriangleDown size={25} />
                  )}
                </div>
                {openUserMenu && (
                  <div className="absolute right-0 top-12">
                    <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={redirectToLoginPage} className="text-lg px-2">
                Login
              </button>
            )}

            <button
              onClick={() => setOpenCartSection(true)}
              className="flex items-center gap-2 h-14 w-28 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
            >
              {/** Cart Icon */}
              <div className="animate-bounce">
                <BsCart4 size={26} />
              </div>
              <div className="font-semibold text-sm ">
                {cartItem[0] ? (
                  <div className="">
                    <p>{totalQty} Items</p>
                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                  </div>
                ) : (
                  <p>My Cart</p>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/** Display Cart Items */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
