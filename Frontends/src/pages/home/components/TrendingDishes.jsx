import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useModal from "../../../hook/useModal";

/**
 * Utility function for star rendering
 * @param {number} value
 * @returns {Array}
 */
const renderStars = (average = 0) =>
  Array.from({ length: 5 }).map((_, i) => (
    <FaStar
      key={i}
      className="text-sm"
      fill={average >= i + 1 ? "#FFB800" : "#E0E0E0"}
      aria-label={average >= i + 1 ? "filled star" : "empty star"}
      data-testid={`star-${i}-${average >= i + 1 ? "filled" : "empty"}`}
    />
  ));

const TrendingDishes = () => {
  const scroller = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { showModal } = useModal();
  const { itemPublic } = useSelector((store) => store.Item);
  const { user } = useSelector((store) => store.Auth);
  const navigate = useNavigate();

  // Efficient scroll availability check
  const updateScrollVisibility = useCallback(() => {
    const el = scroller.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollWidth - el.scrollLeft > el.clientWidth + 2 // padding and rounding tolerance
    );
  }, []);

  useEffect(() => {
    updateScrollVisibility();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollVisibility);
    window.addEventListener("resize", updateScrollVisibility);
    return () => {
      el.removeEventListener("scroll", updateScrollVisibility);
      window.removeEventListener("resize", updateScrollVisibility);
    };
  }, [updateScrollVisibility, itemPublic]);

  const scroll = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 320);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  /**
   * Order button click handler (industry standard)
   * - Not logged in: redirect to login
   * - Logged in user ('user' role): redirect to dashboard
   * - Other roles: show restriction popup
   */
  const handleOrderNow = (dish) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "user") {
      navigate("/dashboard");
    } else {
      showModal({
        title: "Order Restricted",
        message:
          "Only 'user' accounts can place orders. Please log in with a user account.",
        type: "confirm",
      });
    }
  };

  return (
    <section
      id="trending-dishes"
      className="border-b border-[#E5E5E5] bg-white py-14 md:py-16"
    >
      <div className="relative mx-auto max-w-[1600px] px-4 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]">
            Trending Dishes
          </h2>
          <Link
            to="/login"
            className="text-sm font-semibold tracking-wide text-[#FF7A00] transition hover:text-[#E66D00]"
          >
            SEE ALL &gt;
          </Link>
        </div>
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="absolute left-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:left-0"
            aria-label="Previous"
            style={{ display: "flex" }}
          >
            <FaChevronLeft />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute right-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] md:flex lg:right-0"
            aria-label="Next"
            style={{ display: "flex" }}
          >
            <FaChevronRight />
          </button>
        )}
        <div
          ref={scroller}
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {(Array.isArray(itemPublic) && itemPublic.length > 0 ? itemPublic : []).map((d) => {
            const {
              _id,
              image,
              foodName,
              rating,
              price,
              category,
              shop,
              preparationTime,
              foodType,
              veg,
              isAvailable,
            } = d;
            return (
              <article
                key={_id}
                className="flex w-[min(100%,320px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#EFEFEF] bg-white shadow-sm transition hover:shadow-md sm:w-[300px]"
                tabIndex={0}
                aria-label={`${foodName} card`}
              >
                <div className="relative w-full h-[190px]">
                  <img
                    src={image}
                    alt={foodName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    style={{ minHeight: 180, background: "#f7f7f7" }}
                  />
                  {veg !== undefined && (
                    <span
                      className={`absolute top-3 left-3 rounded px-2 py-0.5 text-xs font-bold text-white
                        ${veg ? "bg-green-500" : "bg-red-500"}
                      `}
                    >
                      {veg ? "VEG" : "NON-VEG"}
                    </span>
                  )}
                  {!isAvailable && (
                    <span className="absolute bottom-3 right-3 rounded px-2 py-0.5 bg-[#d32f2f] text-xs font-bold text-white shadow">
                      Not Available
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4 min-h-[180px]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] line-clamp-2" title={foodName}>
                    {foodName}
                  </h3>
                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1.5 text-[#FFB800]">
                    {renderStars(rating?.average)}
                    <span className="ml-1 text-xs font-medium text-[#666]">
                      {Number(rating?.average || 0).toFixed(1)}
                    </span>
                    <span className="text-xs text-[#aaa] ml-1">
                      {rating?.count > 0 ? `(${rating?.count})` : ""}
                    </span>
                  </div>
                  {/* Category, Price, Shop */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 items-center">
                    {category && <span className="text-xs rounded bg-[#FFF5E0] text-[#FF7A00] px-1.5 py-0.5 font-bold">{category}</span>}
                    <span className="text-xs text-[#6e6e6e]">
                      {foodType ? foodType : ""}
                    </span>
                    <span className="text-xs text-[#2d2]" title={shop?.shopName}>
                      {shop?.shopName || ""}
                    </span>
                  </div>
                  {/* Preparation + Price */}
                  <div className="flex items-center gap-4 mt-1 text-xs text-[#888]">
                    {preparationTime && (
                      <span>
                        <strong>Prep:</strong> {preparationTime} min
                      </span>
                    )}
                    {typeof price === "number" && (
                      <span>
                        <strong>₹{price}</strong>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 items-end justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => handleOrderNow(d)}
                      className="rounded-lg cursor-pointer bg-[#FF7A00] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#E66D00] disabled:opacity-70"
                      disabled={!isAvailable}
                      aria-label={isAvailable ? `Order ${foodName}` : `${foodName} not available`}
                    >
                      {isAvailable ? "Order Now" : "Not Available"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          {(!itemPublic || itemPublic.length === 0) && (
            <div className="w-full text-center text-[#888] py-10">
              No trending dishes are available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingDishes;
