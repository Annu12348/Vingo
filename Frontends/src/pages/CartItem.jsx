import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartItem = () => {
  const { cartItems } = useSelector((store) => store.Item);
  const { totalAmount } = useSelector((store) => store.Item);
  return (
    <div className="w-full min-h-screen bg-amber-50  flex items-start justify-center ">
      <div className="md:w-[50%] w-full md:mt-6  p-2">
        <div className="text-2xl text-zinc-700 flex gap-4 ">
          <Link to="/">
            <GoArrowLeft />
          </Link>
          <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
            your cart
          </h1>
        </div>
        <div className="mt-4">
          {cartItems?.length == 0 ? (
            <h1 className="text-xl capitalize font-semibold tracking-tight leading-none  text-center text-zinc-300 ">
              your cart is empty
            </h1>
          ) : (
            <>
              {cartItems.map((items) => (
                <CartItemCard items={items} key={items.id} />
              ))}
              <div className="border flex items-center justify-between  w-full mt-2 border-zinc-500 p-3 rounded-md ">
                <h1 className="text-xl font-semibold capitalize tracking-tight leading-none">
                  total amount
                </h1>
                <h1 className="text-xl font-semibold capitalize tracking-tight leading-none text-red-600">
                ₹{totalAmount}
                </h1>
              </div>
              <div className="w-full flex items-center justify-end ">
                <Link to='/check-out' className="p-4 bg-red-600 text-white font-semibold rounded-md tracking-tight leading-none mt-3">
                  Proceed to Check Out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
