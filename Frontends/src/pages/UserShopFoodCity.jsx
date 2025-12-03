import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setitemByCity } from "../redux/reducer/ItemReducer";
import FoodCard from "./FoodCard";

const UserShopCity = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const { city } = useSelector((store) => store.Auth);
  const { itemByCity } = useSelector((store) => store.Item);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.setAttribute("tabIndex", "-1");

    return () => {};
  }, []);

  const updateShowArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    const tolerance = 2;
    setShowLeft(el.scrollLeft > tolerance);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
  };

  useEffect(() => {
    updateShowArrows();
    window.addEventListener("resize", updateShowArrows);
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateShowArrows);
    }

    return () => {
      window.removeEventListener("resize", updateShowArrows);
      if (el) {
        el.removeEventListener("scroll", updateShowArrows);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      setTimeout(updateShowArrows, 350);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      setTimeout(updateShowArrows, 350);
    }
  };

  useEffect(() => {
    const shopFoodByCityApi = async () => {
      try {
        if (!city?.city) return;
        const response = await instance.get(
          `/item/fetchByCity-City/${city.city}`,
          { withCredentials: true }
        );
        dispatch(setitemByCity(response.data.items));
      } catch (error) {
        console.error(error);
      }
    };

    shopFoodByCityApi();
  }, [city.city]);

  


  return (
    <div className="w-full mt-5 mb-2 ">
      <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
        best shop in {city?.city}
      </h1>
      <div className="w-full relative  ">
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="text-2xl bg-[#00000097] text-white h-fit absolute top-1/2 -translate-y-1/2 left-2 z-40 p-1 rounded-full transition-opacity"
            aria-label="Scroll Left"
            type="button"
          >
            <IoIosArrowBack />
          </button>
        )}
        {showRight && (
          <button
            onClick={scrollRight}
            className="text-2xl bg-[#00000097] text-white h-fit absolute top-1/2 -translate-y-1/2 right-2 z-40 p-1 rounded-full transition-opacity"
            aria-label="Scroll Right"
            type="button"
          >
            <IoIosArrowForward />
          </button>
        )}
        <style>
          {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
        </style>
        <div
          ref={scrollRef}
          className=" mt-1.5 flex gap-1.5  items-center justify-center  overflow-x-hidden whitespace-nowrap hide-scrollbar w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overscrollBehaviorX: "none",
            touchAction: "pan-y",
            pointerEvents: "auto",
          }}
          tabIndex={-1}
        >
          {itemByCity.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserShopCity;
//mini park kalpana nager 306 ya 301
