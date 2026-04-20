import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Memoized Card for performance
const CategoryCard = memo(({ card, onSelect }) => (
  <div
    className="bg-gradient-to-br from-amber-400 via-pink-200/60 to-red-200 min-w-[230px] max-w-[260px] h-[200px] rounded-2xl shadow-xl overflow-hidden relative mx-1 transition-all transform hover:scale-[1.035] cursor-pointer group"
    onClick={() => onSelect(card.category)}
    tabIndex={0}
    role="button"
    aria-label={`Filter by ${card.category}`}
    onKeyPress={e => (e.key === "Enter" || e.key === " ") && onSelect(card.category)}
  >
    <img
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
      src={card.image}
      alt={card.category}
      loading="lazy"
      draggable={false}
    />
    <div className="absolute bottom-0 w-full px-2 py-2 bg-gradient-to-t from-black/75 via-black/20 to-transparent text-center">
      <span className="text-lg font-bold tracking-wide text-white drop-shadow-lg backdrop-blur-sm">{card.category}</span>
    </div>
  </div>
));

const CARD_DATA = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c25ha3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: "Snacks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1728745118618-941ec839208f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1haW4lMjBjb3Vyc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: "Main Course",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1669559809532-1d67e4ac58b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc3NlcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    category: "Desserts",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555072956-7758afb20e8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    category: "Pizza",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    category: "Burgers",
  },
  {
    image:
      "https://media.istockphoto.com/id/182183082/photo/smoked-turkey-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=VO7vz2OCV0IpTpj4PdtjmnPK7X0NuqgYZquEPDnwRMc=",
    category: "Sandwiches",
  },
  {
    image:
      "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHNvdXRoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    category: "South Indian",
  },
  {
    image:
      "https://images.unsplash.com/photo-1695205962564-43ba2b18b075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG5vcnRoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    category: "North Indian",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: "Chinese",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661777702966-aed29ab4106b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGZhc3QlMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    category: "Fast Food",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1728412897938-d70e9c5becd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxsJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    category: "All Food",
  },
];

const SCROLL_AMOUNT = 260 + 16; // card width + gap

const UserDetails = ({ onclicked }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // CardData in a const outside the component for less re-creation
  const handleArrowVisibility = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Browser tolerance
    const tolerance = 2;
    setShowLeft(el.scrollLeft > tolerance);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
  }, []);

  useEffect(() => {
    handleArrowVisibility();
    window.addEventListener("resize", handleArrowVisibility);
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleArrowVisibility, { passive: true });
    }
    return () => {
      window.removeEventListener("resize", handleArrowVisibility);
      if (el) el.removeEventListener("scroll", handleArrowVisibility);
    };
  }, [handleArrowVisibility]);

  const scrollLeftAnimated = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
    setTimeout(handleArrowVisibility, 300);
  }, [handleArrowVisibility]);

  const scrollRightAnimated = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
    setTimeout(handleArrowVisibility, 300);
  }, [handleArrowVisibility]);

  // Hotkey navigation: Left/Right on the scroll view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        scrollRightAnimated();
      } else if (e.key === "ArrowLeft") {
        scrollLeftAnimated();
      }
    };
    el.addEventListener("keydown", handleKey);
    return () => {
      if (el) el.removeEventListener("keydown", handleKey);
    };
  }, [scrollLeftAnimated, scrollRightAnimated]);

  return (
    <section className="w-full mb-5">
      <header className="mb-1.5 flex items-center gap-2 px-1">
        <span className="inline-block text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-2xl md:text-3xl font-black tracking-tight animate-fadein">
          🔥
        </span>
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-orange-800 via-pink-600 to-orange-400 bg-clip-text text-transparent animate-gradient-flow drop-shadow">
          Explore Food Categories
        </h2>
      </header>
      <p className="text-sm text-gray-500 font-medium px-1 mb-1.5">Find something exciting for your next order!</p>
      <div className="w-full relative group">
        {showLeft && (
          <button
            onClick={scrollLeftAnimated}
            className="text-3xl bg-gradient-to-br from-orange-500/90 to-pink-500/90 shadow-xl text-white hover:scale-110 hover:bg-orange-800 focus:ring-2 focus:ring-pink-400 ring-offset-2 h-12 w-12 flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2 z-40 rounded-full transition-all"
            aria-label="Scroll Left"
            type="button"
            tabIndex={0}
          >
            <IoIosArrowBack />
          </button>
        )}
        {showRight && (
          <button
            onClick={scrollRightAnimated}
            className="text-3xl bg-gradient-to-br from-orange-500/90 to-pink-500/90 shadow-xl text-white hover:scale-110 hover:bg-pink-800 focus:ring-2 focus:ring-orange-400 ring-offset-2 h-12 w-12 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 z-40 rounded-full transition-all"
            aria-label="Scroll Right"
            type="button"
            tabIndex={0}
          >
            <IoIosArrowForward />
          </button>
        )}
        {/* Hide scrollbar cross-browser */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { scrollbar-width: none; ms-overflow-style: none; }
            @keyframes gradientFlow {
              0% {background-position: 0% 50%;}
              50% {background-position: 100% 50%;}
              100% {background-position: 0% 50%;}
            }
            .animate-gradient-flow {
              background-size: 200% 200%;
              animation: gradientFlow 4s ease-in-out infinite;
            }
            .animate-fadein{animation:fadInUp 0.7s;}
            @keyframes fadInUp{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:1}}
          `}
        </style>
        <div
          ref={scrollRef}
          className="mt-0 flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar w-full px-1 py-2 snap-x snap-mandatory"
          style={{
            touchAction: "pan-y",
            scrollBehavior: "smooth",
            overscrollBehaviorX: "contain",
          }}
          tabIndex={0}
          aria-label="Food categories"
          role="listbox"
        >
          {CARD_DATA.map((card, idx) => (
            <CategoryCard card={card} key={idx} onSelect={onclicked} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(UserDetails);