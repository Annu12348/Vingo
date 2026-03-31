import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";



const TrendingDishes = () => {
  const scroller = useRef(null);
  const Navigate = useNavigate()
  const { itemPublic } = useSelector(store => store.Item);

  const scroll = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const clickedHandler = () => {
    Navigate("/dashboard")
  }

  return (
    <section id="trending-dishes" className="border-b border-[#E5E5E5] bg-white py-14 md:py-16">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 lg:px-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]">Trending Dishes</h2>
          <Link
            to="/login"
            className="text-sm font-semibold tracking-wide text-[#FF7A00] transition hover:text-[#E66D00]"
          >
            SEE ALL &gt;
          </Link>
        </div>

        <button
          type="button"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-[58%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:left-0"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="absolute right-2 top-[58%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:right-0"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>

        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {itemPublic.map((d) => (
            <article
              key={d._id}
              className="flex w-[min(100%,280px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#EFEFEF] bg-white shadow-sm transition hover:shadow-md sm:w-[260px]"
            >
              <img src={d.image} alt="" className="h-[180px] w-full object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-bold text-[#1A1A1A]">{d.foodName}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                  <span className="ml-1 text-sm font-medium text-[#666]">{d.rating.count}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-[#666]">{d.category}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={clickedHandler}
                    className="rounded-lg cursor-pointer bg-[#FF7A00] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#E66D00]"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDishes;
