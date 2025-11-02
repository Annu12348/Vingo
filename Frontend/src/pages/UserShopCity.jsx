import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setShopByCity } from "../redux/reducer/ShopReducer";

const UserShopCity = () => {
  const scrollRef = useRef(null);
  const { city } = useSelector((store) => store.Auth);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const { shopByCity } = useSelector((store) => store.Shop);
  const dispatch = useDispatch();
  console.log(shopByCity)

  const CardData = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1728412897938-d70e9c5becd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxsJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "All Food",
    },
  ];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const preventUserScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    scrollElement.addEventListener("wheel", preventUserScroll, {
      passive: false,
    });
    scrollElement.addEventListener("touchmove", preventUserScroll, {
      passive: false,
    });
    scrollElement.addEventListener("keydown", preventUserScroll, {
      passive: false,
    });

    scrollElement.addEventListener("mousedown", preventUserScroll, {
      passive: false,
    });

    scrollElement.setAttribute("tabIndex", "-1");

    return () => {
      scrollElement.removeEventListener("wheel", preventUserScroll);
      scrollElement.removeEventListener("touchmove", preventUserScroll);
      scrollElement.removeEventListener("keydown", preventUserScroll);
      scrollElement.removeEventListener("mousedown", preventUserScroll);
    };
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
        dispatch(setShopByCity(response.data.shops))
      } catch (error) {
        console.error(error);
      }
    };
  
    shopByCityApi();
  }, [city.city]);

  return (
    <div className="w-full  mt-6  ">
      <div className="w-full h-full">
        <h1 className="text-xl font-bold tracking-tight leading-none capitalize">
          best shop in {city.city}
        </h1>
        <div className="relative w-full">
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
            className="p-1 mt-2 flex gap-1.5 overflow-x-auto whitespace-nowrap hide-scrollbar w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehaviorX: "none",
              touchAction: "none",
              pointerEvents: "auto",
            }}
            tabIndex={-1}
          >
            {shopByCity.map((city) => (
              <div
                key={city._id}
                className="w-[30vh] min-w-[29.3vh] h-[30vh] rounded-xl overflow-hidden relative inline-block mr-2 group"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={city.image}
                  alt={city.shopName}
                />
                <h1 className="text-[17px] text-white absolute bottom-0 text-center py-0.5 font-semibold w-full bg-[#8da98184]">
                {city.shopName}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShopCity;
//3.30 hourse