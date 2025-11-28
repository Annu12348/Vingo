import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const UserDetails = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const CardData = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c25ha3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "Snacks",
    },
    {
      image:
        "https://images.unsplash.com/photo-1728745118618-941ec839208f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1haW4lMjBjb3Vyc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "Main Course",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1669559809532-1d67e4ac58b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc3NlcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      foodName: "Desserts",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555072956-7758afb20e8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      foodName: "Pizza",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      foodName: "Burgers",
    },
    {
      image:
        "https://media.istockphoto.com/id/182183082/photo/smoked-turkey-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=VO7vz2OCV0IpTpj4PdtjmnPK7X0NuqgYZquEPDnwRMc=",
      foodName: "SandWiches",
    },
    {
      image:
        "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNvdXRoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "South Indian",
    },
    {
      image:
        "https://images.unsplash.com/photo-1695205962564-43ba2b18b075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG5vcnRoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "North Indian",
    },
    {
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "Chinese",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661777702966-aed29ab4106b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGZhc3QlMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      foodName: "Fast Food",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1728412897938-d70e9c5becd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxsJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      foodName: "All Food",
    },
  ];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
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
  return (
    <div className="w-full ">
      <h1 className="text-xl font-bold tracking-tight leading-none ">
        Inspiration for Your first Orders
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
          className=" mt-1.5 flex gap-1.5  overflow-x-hidden whitespace-nowrap hide-scrollbar w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overscrollBehaviorX: "none",
          touchAction: "pan-y",
          }}
          tabIndex={-1}
        >
          {CardData.map((card, index) => (
            <div
              key={index}
              className="bg-amber-300 min-w-[36.4vh] h-[24vh] rounded-xl overflow-hidden relative inline-block  group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={card.image}
                alt={card.foodName}
              />
              <h1 className="text-[17px] text-white absolute bottom-0 text-center py-0.5 font-semibold w-full bg-[#8da98184]">
                {card.foodName}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
//9:00 to 12:10  = 3:10
//1:40 to 3:50 = 2:10
//5:20 to  7:20 = 2