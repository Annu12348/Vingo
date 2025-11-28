import React from "react";
import { GrAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../redux/reducer/ItemReducer";

const CartItemCard = ({ items }) => {
  const dispatch = useDispatch();
  const handleIncrement = (id, currentQuantity) => {
    dispatch(updateCartItem({ id, quantity: currentQuantity + 1 }));
  };
  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateCartItem({ id, quantity: currentQuantity - 1 }));
    }
  };
  return (
    <div className="border flex items-center justify-between  w-full mt-2 border-zinc-500 p-1.5 rounded-md ">
      <div className="flex items-center gap-3">
        <img
          className="md:w-30 border border-zinc-950 w-20 rounded object-center h-16 md:h-20 object-cover  "
          src={items?.image}
          alt={items?.foodName}
        />
        <div>
          <h1 className=" font-bold tracking-tight capitalize">
            {items?.foodName}
          </h1>
          <h1 className="text-zinc-500 font-semibold">
            ₹{items?.price} x {items.quantity}
          </h1>
          <h1 className="font-semibold">₹{items?.price * items.quantity}</h1>
        </div>
      </div>
      <div className="flex items-center md:gap-3 gap-1.5">
        <button
          onClick={() => handleDecrement(items.id, items.quantity)}
          className="text-2xl bg-zinc-200 rounded-full p-0.5 cursor-pointer"
        >
          <GrFormSubtract />
        </button>
        <span className="">{items.quantity}</span>
        <button
          onClick={() => handleIncrement(items.id, items.quantity)}
          className="text-xl bg-zinc-200 rounded-full p-1 cursor-pointer"
        >
          <GrAdd />
        </button>
        <button
          onClick={() => dispatch(removeCartItem(items.id))}
          className="text-3xl text-red-500 bg-zinc-200 rounded-full p-1 cursor-pointer"
        >
          <CiTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
//9:30 to 2:30
//3:00 to 6:00
//7:00 to
