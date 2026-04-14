import React, { useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useModal from "../../../hook/useModal";

// Memoized Star Rating component for performance
const StarRating = React.memo(({ rating }) => (
  <span className="flex items-center gap-0.5 text-[#FFB800]" aria-label={`Rating: ${rating}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className="text-sm"
        fill={rating >= i + 1 ? "#FFB800" : "#E0E0E0"}
        aria-hidden="true"
      />
    ))}
  </span>
));

// Memoized RestaurantCard for better rendering perf
const RestaurantCard = React.memo(({ r, handleOpenClick }) => {
  const {
    _id,
    shopName,
    image,
    address,
    city,
    state,
    rating,
    totalReviews,
    category,
    isActive,
    isOpen,
    closeTime,
    minOrderAmount,
    description,
    deliveryTime,
  } = r;

  return (
    <article
      key={_id}
      className="flex flex-col overflow-hidden rounded-2xl border border-[#EFEFEF] bg-white shadow-sm transition hover:shadow-md focus-within:shadow-md outline-none"
      aria-label={shopName}
      tabIndex={0}
    >
      {/* Restaurant Image & Status */}
      <div className="relative h-[200px] w-full shrink-0 select-none">
        <img
          src={image}
          alt={shopName || "Restaurant"}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ backgroundColor: "#f2f2f2" }}
        />
        {isOpen && isActive ? (
          <button
            onClick={() => handleOpenClick(r)}
            className="absolute bottom-3 right-3 rounded-md bg-[#4CAF50] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md focus:ring-2 focus:ring-[#4CAF50] focus:outline-none transition"
            aria-label={`Open now: ${shopName}`}
            tabIndex={0}
          >
            OPEN NOW
          </button>
        ) : (
          <span className="absolute bottom-3 right-3 rounded-md bg-[#C0392B] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md select-none">
            CLOSED
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 min-w-0">
        <h3
          className="text-xl font-bold text-[#1A1A1A] truncate"
          title={shopName}
          tabIndex={0}
        >
          {shopName}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={Number(rating)} />
          <span className="text-sm font-medium text-[#666]" aria-label={`Average rating: ${Number(rating).toFixed(1)}`}>{Number(rating).toFixed(1)}</span>
          <span className="text-xs text-[#aaa] ml-1" aria-label={`${totalReviews} reviews`}>
            ({totalReviews} reviews)
          </span>
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-2">
          <span className="text-xs bg-[#FFF5E0] text-[#FF7A00] rounded px-2 py-0.5 font-bold">
            {category}
          </span>
          <span className="text-xs text-[#888]">
            {city}, {state}
          </span>
        </div>
        <div className="mt-1 text-xs text-[#555] truncate" title={address}>
          {address}
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-[#888]">
          <span>
            <strong>Min:</strong> ₹{minOrderAmount}
          </span>
          <span>
            <strong>Delivers in:</strong> {deliveryTime}
          </span>
          <span>
            <strong>Closes:</strong> {closeTime}
          </span>
        </div>
        {description && (
          <p className="mt-3 text-sm text-[#666] line-clamp-2" title={description}>
            {description}
          </p>
        )}
      </div>
    </article>
  );
});

const PopularRestaurants = () => {
  // Pull only what's required for perf, using shallowEqual if store shape grows
  const publicShop = useSelector((store) => store.Shop.publicShop) || [];
  const user = useSelector((store) => store.Auth.user);
  const navigate = useNavigate();
  const { showModal } = useModal();

  // Memoize for referential equality -- good for passing as prop
  const handleOpenClick = useCallback((shop) => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "owner") {
      navigate("/dashboard");
    } else {
      showModal({
        title: "Block/Unblock Shop",
        message:
          "To block or unblock this shop, please log in with an owner account.",
        type: "block_unblock_shop",
      });
    }
  }, [user, navigate, showModal]);

  // For perf & memory, cap maximum restaurants (eg top 6)
  const displayedRestaurants = useMemo(() => publicShop.slice(0, 6), [publicShop]);

  return (
    <section
      id="popular-restaurants"
      className="border-b border-[#E5E5E5] bg-white py-14 md:py-16"
      aria-labelledby="popular-restaurants-title"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 lg:px-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="popular-restaurants-title"
            className="text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]"
            tabIndex={0}
          >
            Popular Restaurants
          </h2>
          <Link
            to="/restaurants"
            className="text-sm font-semibold tracking-wide text-[#FF7A00] transition hover:text-[#E66D00] focus:underline"
            aria-label="See all restaurants"
          >
            SEE ALL &gt;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRestaurants.length === 0 ? (
            <p className="col-span-full text-center text-[#666]" tabIndex={0}>
              No popular restaurants available.
            </p>
          ) : (
            displayedRestaurants.map((r) => (
              <RestaurantCard key={r._id} r={r} handleOpenClick={handleOpenClick} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(PopularRestaurants);
