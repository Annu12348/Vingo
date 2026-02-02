import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setShopByCity } from "../redux/reducer/ShopReducer";

const UserShopCity = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const { city } = useSelector((store) => store.Auth);
  const { shopByCity } = useSelector((store) => store.Shop);
  const dispatch = useDispatch();

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
    const shopByCityApi = async () => {
      try {
        if (!city?.city) return;
        const response = await instance.get(
          `/shop/fetchCity-City/${city.city}`,
          { withCredentials: true }
        );
        dispatch(setShopByCity(response.data.shops));
      } catch (error) {
        console.error(error);
      }
    };

    shopByCityApi();
  }, [city.city]);
  return (
    <>
      {shopByCity.length > 0 ? (
        <div className="w-full mt-5  ">
          <h1 className="text-xl capitalize font-bold tracking-tight leading-none ">
            best shop in {city?.city}
          </h1>
          <div className="w-full relative   ">
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
              className=" mt-1.5 flex gap-1.5  overflow-x-hidden whitespace-nowrap hide-scrollbar w-full"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "none",
                touchAction: "pan-y",
                pointerEvents: "auto",
              }}
              tabIndex={-1}
            >
              {shopByCity.map((shop) => (
                <div
                  key={shop?._id}
                  className="bg-amber-200 min-w-[36.4vh] h-[24vh] rounded-xl overflow-hidden relative inline-block  group"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                    src={shop?.image}
                    alt={shop?.shopName}
                  />
                  <h1 className="text-[17px] text-white absolute bottom-0 text-center py-0.5 font-semibold w-full bg-[#8da98184]">
                    {shop?.shopName}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center font-semibold text-xl tracking-tight leading-none text-zinc-300 mt-20">
          No shops found in your city.
        </h1>
      )}
    </>
  );
};

export default UserShopCity;