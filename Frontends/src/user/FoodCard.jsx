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
    <div className="bg-white shadow-lg rounded-xl flex flex-col w-full max-w-[98vw] xs:max-w-[360px] sm:max-w-sm md:max-w-md lg:max-w-[320px] transition-all duration-300">
      <div
        key={item?._id}
        className="w-full rounded-t-xl overflow-hidden relative group transition-all duration-300"
      >
        <img
          className="w-full h-[38vw] min-h-[120px] max-h-[200px] sm:h-[32vw] sm:max-h-[220px] md:h-[180px] md:max-h-[210px] lg:h-[30vh] object-cover transition-transform duration-300 group-hover:scale-105"
          src={item?.image}
          alt={item?.foodName || "Food"}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 p-2 rounded-full bg-white flex items-center justify-center shadow transition-opacity duration-300 ease-in-out group-hover:opacity-80">
          {item.foodType === "Veg" && (
            <span className="text-[#2E7D32] text-lg xs:text-xl md:text-2xl" title="Vegetarian">
              <FaLeaf />
            </span>
          )}
          {item.foodType === "Non-Veg" && (
            <span className="text-[#8B0000] text-lg xs:text-xl md:text-2xl" title="Non-Vegetarian">
              <FaDrumstickBite />
            </span>
          )}
          {item.foodType === "Vegan" && (
            <span className="text-[#387b8e] text-lg xs:text-xl md:text-2xl" title="Vegan">
              <GiSprout />
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between p-2 xs:p-3">
        <h2 className="text-base xs:text-lg sm:text-xl capitalize font-semibold tracking-tight leading-tight truncate">
          {item?.foodName}
        </h2>
        <div className="flex items-center gap-1 xs:gap-2 mt-1">
          <span className="flex text-lg xs:text-xl">{renderStars(item?.rating?.average)}</span>
          <span className="font-bold ml-1 text-gray-600 text-xs xs:text-sm">
            ({item?.rating?.count || 0})
          </span>
        </div>
        <p className="text-gray-500 text-xs xs:text-sm mt-1 line-clamp-2">
          {item?.description ? item.description : "No description available."} 
        </p>
        <div className="mt-2 xs:mt-3 flex items-center justify-between gap-2">
          <span className="text-base xs:text-lg sm:text-xl font-bold tracking-tight text-black whitespace-nowrap">
            ₹{item?.price}
          </span>
          <div className="flex items-center border-2 border-gray-200 rounded-full bg-gray-50">
            <button
              onClick={decrement}
              className="text-base xs:text-lg sm:text-xl font-semibold cursor-pointer bg-white py-0.5 xs:py-1 px-2 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={quantity <= 0}
              aria-label="Remove one"
              tabIndex={0}
            >
              <GrFormSubtract />
            </button>
            <span className="text-sm xs:text-base sm:text-lg px-1 xs:px-2 font-medium select-none bg-white">
              {quantity || 0}
            </span>
            <button
              onClick={increment}
              className="text-base xs:text-lg sm:text-xl font-semibold cursor-pointer bg-white py-0.5 xs:py-1 px-2 rounded-r-none transition"
              aria-label="Add one"
              tabIndex={0}
            >
              <GrAdd />
            </button>
            <button
              type="button"
              className={`ml-1 xs:ml-2 text-lg xs:text-xl sm:text-2xl flex items-center justify-center transition px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                cartItems.some((i) => i.id === item._id)
                  ? "bg-gray-700"
                  : "bg-red-800"
              } text-white`}
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
              aria-label="Add to cart"
              tabIndex={0}
            >
              <RiShoppingCartFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
