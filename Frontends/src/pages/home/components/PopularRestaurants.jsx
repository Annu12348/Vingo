import React from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PopularRestaurants = () => {
  const { publicShop } = useSelector(store => store.Shop)
  const Navigate = useNavigate()

  const clickedHandler = () => {
    Navigate("/dashboard")
  }
  return (
    <section id="popular-restaurants" className="border-b border-[#E5E5E5] bg-white py-14 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 lg:px-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]">Popular Restaurants</h2>
          <Link
            to="/login"
            className="text-sm font-semibold tracking-wide text-[#FF7A00] transition hover:text-[#E66D00]"
          >
            SEE ALL &gt;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publicShop.map((r) => (
            <article
              key={r?._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#EFEFEF] bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-[200px] w-full shrink-0">
                <img src={r?.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <button
                onClick={clickedHandler} 
                className="absolute bottom-3 cursor-pointer right-3 rounded-md bg-[#4CAF50] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                  OPEN NOW
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{r?.shopName}</h3>
                <div className="mt-2 flex items-center gap-1 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                  <span className="ml-1 text-sm font-medium text-[#666]">{r.rating}</span>
                </div>
                {/*<p className="mt-2 text-sm text-[#666]">{r.meta}</p>*/}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;
