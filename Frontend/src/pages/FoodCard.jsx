import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaLeaf, FaDrumstickBite, FaRegStar } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/ItemReducer";

const FoodCard = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useSelector((store) => store.Item);
  const dispatch = useDispatch();

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(rating)) {
        stars.push(
          <span key={i} className="text-yellow-500">
            <IoIosStar />
          </span>
        ); // filled star
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            <FaRegStar />
          </span>
        ); // empty star
      }
    }
    return stars;
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl ">
      <div
        key={item?._id}
        className="bg-amber-200 min-w-[36.4vh] h-[24vh] rounded-t-xl overflow-hidden relative inline-block group transition-all duration-300"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={item?.image}
          alt={item?.foodName}
        />
        <h1 className="absolute top-2 right-2 p-1.5 rounded-full bg-white flex items-center justify-center transition-opacity duration-300 ease-in-out group-hover:opacity-0">
          {item.foodType === "Veg" && (
            <span className="text-[#2E7D32] text-2xl" title="Vegetarian">
              <FaLeaf />
            </span>
          )}
          {item.foodType === "Non-Veg" && (
            <span className="text-[#8B0000] text-2xl" title="Non-Vegetarian">
              <FaDrumstickBite />
            </span>
          )}
          {item.foodType === "Vegan" && (
            <span className="text-[#387b8e] text-2xl" title="Vegan">
              <GiSprout />
            </span>
          )}
        </h1>
      </div>
      <h1 className="text-xl px-2.5 capitalize font-semibold tracking-tight leading-none">
        {item?.foodName}
      </h1>
      <h1 className="text-2xl flex px-2.5 mt-2 items-center">
        {renderStars(item?.rating?.average)}
        <span className="font-bold ml-2 text-gray-600 text-xl">
          ({item?.rating?.count || 0})
        </span>
      </h1>
      <div className="px-2.5 mt-4 flex items-center pb-2 justify-between">
        <h1 className="text-xl font-bold tracking-tight">₹{item?.price}</h1>
        <div className="flex items-center justify-center border-2 rounded-full">
          <button
            onClick={decrement}
            className="text-xl font-semibold pl-2  cursor-pointer bg-white py-1.5 px-1 rounded-l-full "
            disabled={quantity <= 0}
          >
            <span className="hover:bg-zinc-200 block">
              <GrFormSubtract />
            </span>
          </button>
          <span className="text-xl font-semibold bg-white py-0.5 px-1.5 ">
            {quantity || 0}
          </span>
          <button
            onClick={increment}
            className="text-xl font-semibold cursor-pointer bg-white py-1.5 px-1 pr-2"
          >
            <span className="hover:bg-zinc-200 block">
              <GrAdd />
            </span>
          </button>
          <button
            className={`text-2xl ${
              cartItems.some((i) => i.id === item._id)
                ? "bg-gray-700"
                : "bg-red-800"
            } pr-2 px-1 py-1 rounded-r-full cursor-pointer text-white`}
            onClick={() =>
              quantity > 0
                ? dispatch(
                    addToCart({
                      id: item._id,
                      foodName: item.foodName,
                      shop: item.shop,
                      price: item.price,
                      image: item.image,
                      quantity,
                      foodType: item.foodType,
                    })
                  )
                : null
            }
          >
            <span>
              <RiShoppingCartFill />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
