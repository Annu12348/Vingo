import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CATEGORIES = [
  { label: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { label: "Burgers", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
  { label: "Indian", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
  { label: "Desserts", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80" },
  { label: "Drinks", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80" },
  { label: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { label: "Burgers", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
  { label: "Indian", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
  { label: "Desserts", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80" },
  { label: "Drinks", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80" },
];

const BrowseByCategory = () => {
  const scroller = useRef(null);

  const scroll = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <section id="browse-categories" className="border-b border-[#E5E5E5] bg-white py-14 md:py-16">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 lg:px-14">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]">Browse by Category</h2>

        <button
          type="button"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-[60%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:left-0"
          aria-label="Previous categories"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="absolute right-2 top-[60%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:right-0"
          aria-label="Next categories"
        >
          <FaChevronRight />
        </button>

        <div
          ref={scroller}
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              type="button"
              className="flex w-[120px] shrink-0 flex-col items-center gap-3 text-center transition hover:opacity-90 sm:w-[130px]"
            >
              <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-3xl border border-[#EFEFEF] bg-[#FAFAFA] shadow-sm sm:h-[130px] sm:w-[130px]">
                <img src={c.img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
