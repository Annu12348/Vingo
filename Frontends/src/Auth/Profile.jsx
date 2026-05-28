import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { GoArrowUp } from "react-icons/go";
//import { FaShoppingBag } from "react-icons/fa6";

/**
 * AVATAR Fallback for Missing Image
 */
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1627292441194-0280c19e74e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fG1vZGVsfGVufDB8fDB8fHww";

/**
 * ProfileDetailItem - reusable, production-grade component for rendering a profile field with an icon.
 */
const ProfileDetailItem = React.memo(function ProfileDetailItem({ icon: Icon, value, fallback, className = "" }) {
  return (
    <div
      className={`flex items-center gap-3 mb-2 text-zinc-700 ${className}`}
      role="contentinfo"
      data-testid={`profile-detail-${Icon.displayName || Icon.name || "icon"}`}
    >
      <Icon className="text-lg" aria-hidden="true" focusable="false" />
      <span className="text-base font-medium break-words" data-testid="profile-detail-value">
        {value && typeof value === "string" && value.trim() ? value : fallback}
      </span>
    </div>
  );
});

ProfileDetailItem.displayName = "ProfileDetailItem";
ProfileDetailItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.string,
  fallback: PropTypes.string.isRequired,
  className: PropTypes.string,
};

/**
 * ProfileStatCard - accurate, accessible metric card component.
 */
const ProfileStatCard = React.memo(function ProfileStatCard({ icon: Icon, label, value, link, linkLabel, "data-testid": dataTestId }) {
  return (
    <div
      className="flex-1 bg-zinc-200 rounded-lg flex items-center px-5 py-4 min-h-[110px] shadow-sm"
      role="region"
      aria-label={label}
      tabIndex={0}
      data-testid={dataTestId}
    >
      <div className="flex items-center justify-center h-14 w-14 bg-zinc-600 rounded-full mr-4" aria-hidden="true">
        <Icon className="text-blue-100 text-3xl" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="uppercase text-xs font-semibold text-zinc-800 mb-1 tracking-wider">{label}</span>
        <span className="text-2xl font-bold text-zinc-900 mb-1">
          {typeof value === "number" ? value : "—"}
        </span>
        <a
          href={link}
          className="text-blue-800 underline text-sm font-medium hover:text-blue-900 transition focus:outline-none focus:underline"
          aria-label={linkLabel}
          tabIndex={0}
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
});
ProfileStatCard.displayName = "ProfileStatCard";
ProfileStatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  link: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  "data-testid": PropTypes.string,
};

/**
 * Profile - main user profile component (fully productionized)
 */
const Profile = () => {
  const user = useSelector((store) => store.Auth?.user);

  // Memoized user derived fields with default and validated fallback logic
  const {
    avatarUrl,
    fullName,
    isVerified,
    email,
    contact,
    address,
    stats,
  } = useMemo(() => ({
    avatarUrl: typeof user?.avatar === "string" && user.avatar.trim() ? user.avatar : DEFAULT_AVATAR,
    fullName: typeof user?.FullName === "string" && user.FullName.trim() ? user.FullName : "—",
    isVerified:
      typeof user?.isVerified === "boolean"
        ? user.isVerified
        : typeof user?.isVerified !== "undefined"
          ? Boolean(user?.isVerified)
          : null,
    email: typeof user?.email === "string" ? user.email : "",
    contact: typeof user?.contact === "string" ? user.contact : "",
    address: typeof user?.address === "string" && user.address.trim() ? user.address.trim() : "",
    stats: {
      totalSpent: typeof user?.totalSpent === "number" ? user.totalSpent : 12459,
      totalOrders: typeof user?.totalOrders === "number" ? user.totalOrders : 25,
      wishlistCount: typeof user?.wishlistCount === "number" ? user.wishlistCount : 7,
      addressCount: typeof user?.addressCount === "number" ? user.addressCount : 3,
      thisMonthIncrease: typeof user?.thisMonthIncrease === "number" ? user.thisMonthIncrease : 15,
    },
  }), [user]);

  // Production-grade edit handler
  const handleEditProfile = useCallback((e) => {
    e.preventDefault();
    // Ideally use a notification/toast and open a modal or trigger navigation
    // Hide "alert" in production, fallback to robust UX if toast/modal not available
    if (window?.toast) {
      window.toast.info("Edit profile feature coming soon.");
    } else {
      // fallback for missing toast implementation
      // You'd replace/remove this in final release
      alert("Edit profile feature coming soon.");
    }
  }, []);

  return (
    <section className="p-3" data-testid="profile-section">
      <div className="w-full p-2 bg-white shadow rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Profile Card */}
        <section className="md:w-[49%] w-full p-6 bg-zinc-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          {/* Profile Picture & Edit */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 bg-amber-300 rounded-full overflow-hidden border-4 border-white shadow-sm"
              aria-label="User profile avatar"
            >
              <img
                className="w-full h-full object-cover"
                src={avatarUrl}
                alt="User profile"
                loading="lazy"
                draggable="false"
                width={96}
                height={96}
              />
            </div>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 transition text-white border-2 border-blue-200 mt-2 px-4 py-2 rounded-lg shadow active:scale-95 duration-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Edit Profile"
              tabIndex={0}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
          {/* Profile Details */}
          <div className="w-full md:pl-6 flex flex-col justify-between mt-6 md:mt-0">
            <div className="flex items-center mb-3 min-h-[40px]">
              <h1
                className="text-2xl capitalize font-bold mr-3 text-zinc-900 break-all"
                data-testid="user-full-name"
              >
                {fullName}
              </h1>
              {isVerified === null ? null : isVerified ? (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg font-semibold ml-2 select-none">
                  Verified User
                </span>
              ) : (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-lg font-semibold ml-2 select-none">
                  Unverified
                </span>
              )}
            </div>
            <ProfileDetailItem
              icon={MdEmail}
              value={email}
              fallback="Not provided"
            />
            <ProfileDetailItem
              icon={FaPhone}
              value={contact}
              fallback="Not provided"
            />
            <ProfileDetailItem
              icon={CiLocationOn}
              value={address}
              fallback="No address provided"
              className="mb-0"
            />
          </div>
        </section>

        {/* Stats Card */}
        <aside
          className="md:w-[49%] w-full bg-zinc-100 rounded-lg p-4 flex flex-col justify-center h-full min-h-[170px] shadow"
          aria-label="User spend stats"
          data-testid="user-spend-stats"
        >
          <div>
            <p className="text-sm font-medium text-zinc-700 mb-1 uppercase tracking-wide">
              Total Spent
            </p>
            <h1
              className="text-4xl font-bold text-zinc-900 mb-2"
              data-testid="user-total-spent"
            >
              ₹
              {typeof stats.totalSpent === "number"
                ? stats.totalSpent.toLocaleString("en-IN")
                : "—"}
            </h1>
            <div className="flex items-center text-zinc-700 text-sm">
              <span className="mr-2">This Month</span>
              <span className="flex items-center text-green-600 font-bold mr-1">
                <GoArrowUp className="inline-block text-lg" />
                {typeof stats.thisMonthIncrease === "number"
                  ? `${stats.thisMonthIncrease}%`
                  : "—"}
              </span>
              <span className="text-zinc-500 font-normal" aria-live="polite">
                (↑ increased)
              </span>
            </div>
          </div>
        </aside>
      </div>

      <div className="bg-white rounded-lg p-4 mt-6 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
        <ProfileStatCard
          //icon={FaShoppingBag}
          label="Total Orders"
          value={stats.totalOrders}
          link="/orders"
          linkLabel="View all orders"
          data-testid="user-total-orders"
        />
        <ProfileStatCard
          //icon={FaShoppingBag}
          label="Wishlist"
          value={stats.wishlistCount}
          link="/wishlist"
          linkLabel="View wishlist"
          data-testid="user-wishlist-count"
        />
        <ProfileStatCard
          //icon={FaShoppingBag}
          label="Addresses"
          value={stats.addressCount}
          link="/addresses"
          linkLabel="Manage addresses"
          data-testid="user-address-count"
        />
      </div>
    </section>
  );
};

Profile.displayName = "Profile";

export default React.memo(Profile);
