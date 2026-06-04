import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RiRestaurantLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

// Move default avatar to a constants file in production
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1773332585815-f106a5d6ed6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8";

// OwnerProfile Component - production/industrial standard
const OwnerProfile = React.memo(function OwnerProfile() {
  // Selector with fallback
  const user = useSelector((state) => state.Auth?.user) ?? {};
  const city = useSelector((state) => state.Auth?.city) ?? {};

  // You can fetch these from Redux or API instead in real code
  const menuItemCount = useSelector((state) => state.Menu?.items?.length) ?? 25;

  // Memoize data for performance & null safety
  const {
    avatarUrl,
    fullName,
    email,
    contact,
    cityString,
    role,
  } = useMemo(() => {
    return {
      avatarUrl:
        typeof user.avatar === "string" && user.avatar.trim()
          ? user.avatar
          : DEFAULT_AVATAR,
      fullName:
        typeof user.FullName === "string" && user.FullName.trim()
          ? user.FullName
          : "—",
      email:
        typeof user.email === "string" && user.email.trim()
          ? user.email
          : "—",
      contact:
        typeof user.contact === "string" && user.contact.trim()
          ? user.contact
          : "—",
      role:
        typeof user.role === "string" && user.role.trim()
          ? user.role
          : "owner",
      cityString:
        [city.city, city.state, city.country]
          .filter((value) => typeof value === "string" && value.trim())
          .join(", ") || "—",
    };
  }, [user, city]);

  // Edit handler
  const handleEditProfile = useCallback((e) => {
    e.preventDefault();
    if (window?.toast?.info) {
      window.toast.info("Profile editing is coming soon.");
    } else if (window?.Notification && Notification.permission === "granted") {
      new window.Notification("Edit Profile", {
        body: "Profile editing feature coming soon.",
      });
    } else {
      alert("Edit profile feature coming soon.");
    }
  }, []);

  return (
    <section
      className="p-4 w-full min-h-full font-inter"
      data-testid="owner-profile-section"
      aria-label="Owner Profile Section"
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight leading-none text-zinc-900 mb-1">
          Owner Profile
        </h1>
        <p className="text-base tracking-tight font-medium text-zinc-500 mb-4">
          Manage your restaurant and personal details
        </p>
      </header>
      <div className=" w-full mt-2 rounded-2xl flex flex-col md:flex-row items-start gap-6 ">
        {/* Left: Avatar & Details */}
        <section className="md:w-[64%] w-full bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-md transition-all duration-200 hover:shadow-xl">
          {/* Avatar */}
          <div className="w-36 h-36 md:w-44 md:h-44 bg-gradient-to-tr from-orange-200 to-pink-100 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <img
              src={avatarUrl}
              alt="Owner Profile"
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
              width={176}
              height={176}
              decoding="async"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Details */}
          <div className="ml-0 md:ml-10 flex flex-col justify-center min-w-0 w-full mt-7 md:mt-0">
            <div className="flex items-center mb-2 min-h-[40px]">
              <h2
                className="font-bold text-2xl md:text-3xl capitalize text-zinc-900 break-words mr-4"
                data-testid="owner-full-name"
                title={fullName}
              >
                {fullName}
              </h2>
              <span
                className="text-xs md:text-sm bg-orange-100 text-orange-900 px-2.5 py-1 rounded-lg font-semibold ml-2 select-none border border-orange-300"
                data-testid="owner-verified"
                aria-label="Verified Owner"
              >
                <span className="inline-block align-middle animate-pulse mr-1">✔</span>Verified
              </span>
            </div>
            <div className="flex items-center gap-3 mt-3 capitalize text-lg font-medium text-zinc-700">
              <span className="text-2xl text-orange-500" aria-hidden>
                <RiRestaurantLine />
              </span>
              <span>Restaurant Owner</span>
            </div>
            <div className="flex items-center gap-3 mt-4 text-base font-medium text-zinc-700 break-all">
              <span className="text-xl text-blue-500" aria-hidden>
                <MdOutlineMailOutline />
              </span>
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 mt-4 text-base font-medium text-zinc-700">
              <span className="text-xl text-green-500" aria-hidden>
                <FaPhoneAlt />
              </span>
              <span>{contact}</span>
            </div>
            <div className="flex items-center gap-3 mt-4 text-base font-medium text-zinc-700 break-all">
              <span className="text-xl text-red-500" aria-hidden>
                <FaMapMarkerAlt />
              </span>
              <span>{cityString}</span>
            </div>
            <button
              type="button"
              className="mt-8 w-fit self-start bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:ring-4 focus:ring-orange-200 text-white px-6 py-2.5 rounded-lg shadow-md active:scale-95 transition duration-150 font-semibold text-base outline-none"
              aria-label="Edit Owner Profile"
              onClick={handleEditProfile}
              data-testid="edit-owner-profile-btn"
            >
              Edit Profile
            </button>
          </div>
        </section>

        <h1>hh</h1>

        {/* Right: Stats/Business Overview */}
        <aside className="md:w-[35%] w-full bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center transition-all hover:shadow-lg">
          <div className="w-full flex items-center justify-between mb-3 text-zinc-700">
            <span className="font-bold text-base tracking-wide">Business Overview</span>
            <button
              className="text-orange-700 hover:underline hover:text-orange-600 font-semibold text-sm px-3 py-1 rounded focus:outline-none transition"
              aria-label="View Analytics"
              onClick={() =>
                window?.toast?.info
                  ? window.toast.info("Analytics feature coming soon!")
                  : alert("Analytics feature coming soon!")
              }
              type="button"
            >
              View Analytics
            </button>
          </div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-3">
            {/* Example widgets (replace with real KPIs) */}
            <div className="w-[48%] min-h-[70px] bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl shadow-inner flex flex-col items-center justify-center p-3">
              <span className="text-2xl font-bold text-orange-700">12</span>
              <span className="text-xs text-zinc-600">Active Orders</span>
            </div>
            <div className="w-[48%] min-h-[70px] bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl shadow-inner flex flex-col items-center justify-center p-3">
              <span className="text-2xl font-bold text-pink-700">₹32,000</span>
              <span className="text-xs text-zinc-600">This Month's Revenue</span>
            </div>
            <div className="w-[48%] min-h-[70px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-inner flex flex-col items-center justify-center p-3">
              <span className="text-2xl font-bold text-blue-700">4.8</span>
              <span className="text-xs text-zinc-600">Avg. Rating</span>
            </div>
            <div className="w-[48%] min-h-[70px] bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-inner flex flex-col items-center justify-center p-3">
              <span className="text-2xl font-bold text-green-700">5</span>
              <span className="text-xs text-zinc-600">Staff Members</span>
            </div>
            {/* Added Menu Items Widget */}
            <div className="w-[48%] min-h-[70px] bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl shadow-inner flex flex-col items-center justify-center p-3">
              <span className="text-2xl font-bold text-yellow-700 flex items-center gap-1">
                <GiKnifeFork className="inline-block mr-1 text-yellow-700" />{menuItemCount}
              </span>
              <span className="text-xs text-zinc-600">Menu Items</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
});

OwnerProfile.displayName = "OwnerProfile";
export default OwnerProfile;
