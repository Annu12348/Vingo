import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setShopByCity } from "../redux/reducer/ShopReducer";
import { setitemByCity } from "../redux/reducer/ItemReducer";

const UserShopFoodCity = () => {
  const scrollRef = useRef(null);
  const { city } = useSelector((store) => store.Auth);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const { shopByCity } = useSelector((store) => store.Shop);
  const dispatch = useDispatch();
  const { itemByCity } = useSelector(store => store.Item)
  console.log(itemByCity)

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
    const shopFoodByCityApi = async () => {
      try {
        if (!city?.city) return;
        const response = await instance.get(
          `/item/fetchByCity-City/${city.city}`,
          { withCredentials: true }
        );
        console.log(response.data.items)
        dispatch(setitemByCity(response.data.items))
      } catch (error) {
        console.error(error);
      }
    };
  
    shopFoodByCityApi();
  }, [city.city]);

  return (
    <div className="w-full  mt-4  ">
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
            className="p-1 mt-1  flex gap-0.5  overflow-x-auto whitespace-nowrap hide-scrollbar w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehaviorX: "none",
              touchAction: "none",
              pointerEvents: "auto",
            }}
            tabIndex={-1}
          >
            {itemByCity.map((city) => (
              <div
                key={city._id}
                className="min-w-[36.1vh] h-[22vh] rounded-xl overflow-hidden relative inline-block mr-2 group"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={city.image}
                  alt={city.foodName}
                />
                <h1 className="text-[17px] text-white absolute bottom-0 text-center py-0.5 font-semibold w-full bg-[#8da98184]">
                {city.foodName}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShopFoodCity;
//12.00 to 1:30 = 1:30hourse;
//4:25 to 5:03 = 38Minat;
//1:00 to 5:00 = 4hourse;
//7:00 to 8:00 = 1hourse;
//total = 7hourse