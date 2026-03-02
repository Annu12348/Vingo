import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setitemByCity } from "../redux/reducer/ItemReducer";
import FoodCard from "./FoodCard";

const UserShopFoodCity = ({data, updatedItemsList}) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const { city } = useSelector((store) => store.Auth);
  const { shopByCity } = useSelector((store) => store.Shop);
  

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
    <>
      {shopByCity.length > 0 ? (
        data.length > 0 ? (
          <section className="w-full mt-6 mb-4">
            <h1 className="text-2xl sm:text-3xl capitalize font-extrabold tracking-tight leading-none text-gray-900 mb-3">
              Best Shops in <span className="text-amber-600">{city?.city}</span>
            </h1>
            <div className="w-full relative">
              <div
                className="flex flex-wrap gap-4 justify-center items-stretch w-full"
                style={{ rowGap: "1.5rem" }}
              >
                {updatedItemsList?.length > 0 ? (
                  updatedItemsList.map((item) => (
                    <div key={item._id} className="flex-grow-0 basis-[320px] sm:basis-[260px] md:basis-[300px] flex items-stretch">
                      <FoodCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="w-full">
                    <h2 className="text-center text-lg text-gray-400 font-semibold py-8">
                      No food items found.
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <h1 className="text-center font-semibold text-lg md:text-xl tracking-tight leading-none text-gray-400 mt-20">
            No food items available for shops in your city.
          </h1>
        )
      ) : null}
    </>
  );
};

export default UserShopFoodCity;

