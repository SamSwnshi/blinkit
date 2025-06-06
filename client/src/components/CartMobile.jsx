import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupess";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobile = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2 tracking-wide">
          <div className="bg-green-800 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/cartitems"} className="flex items-center gap-1">
              <span className="text-sm hover:text-green-300">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
