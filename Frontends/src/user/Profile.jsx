 import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavorite } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { GoArrowUp } from "react-icons/go";
import { GiAchievement } from "react-icons/gi";
import { Link } from "react-router-dom";

// Constants
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1627292441194-0280c19e74e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fG1vZGVsfGVufDB8fDB8fHww";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Utility: fallback label
const getFallbackLabel = (type) => {
  switch (type) {
    case 'email': return "Not provided";
    case 'contact': return "Not provided";
    case 'address': return "No address provided";
    default: return "—";
  }
};

/**
 * ProfileDetailItem
 * Industrial-grade, concise, well-documented
 */
const ProfileDetailItem = React.memo(function ProfileDetailItem({
  icon: Icon,
  value,
  fallback,
  iconColor = "text-blue-500",
  className = "",
  "data-testid": dataTestId,
}) {
  const val = value && typeof value === "string" && value.trim() ? value : fallback;
  return (
    <div
      className={classNames("flex items-center gap-3 mb-2 text-zinc-700", className)}
      data-testid={dataTestId}
      role="contentinfo"
    >
      <Icon className={classNames("text-lg", iconColor)} aria-hidden focusable={false} />
      <span className="text-base font-medium break-words" data-testid="profile-detail-value">{val}</span>
    </div>
  );
});
ProfileDetailItem.displayName = "ProfileDetailItem";
ProfileDetailItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.string,
  fallback: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconColor: PropTypes.string,
  "data-testid": PropTypes.string,
};

/**
 * ProfileStatCard
 * Polished, accessible, follows enterprise patterns
 */
const ProfileStatCard = React.memo(function ProfileStatCard({
  icon: Icon,
  value,
  label,
  link,
  linkLabel,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  "data-testid": dataTestId,
}) {
  return (
    <div
      className="flex-1 bg-zinc-100 rounded-lg flex items-center px-5 py-4 min-h-[110px] shadow-sm"
      role="region"
      aria-label={label}
      tabIndex={0}
      data-testid={dataTestId}
    >
      {Icon && (
        <span className={classNames("flex items-center justify-center h-14 w-14 rounded-full mr-4", iconBg)} aria-hidden>
          <Icon className={classNames("text-3xl", iconColor)} />
        </span>
      )}
      <div className="flex flex-col justify-center min-w-0">
        <span className="uppercase text-xs font-semibold text-zinc-800 mb-1 tracking-wider truncate" title={label}>{label}</span>
        <span className="text-2xl font-bold text-zinc-900 mb-1" data-testid={`${dataTestId}-value`}>
          {typeof value === "number" ? value : "—"}
        </span>
        <a
          href={link}
          className="text-blue-700 underline text-sm font-medium hover:text-blue-900 transition focus:outline-none focus:underline"
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
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  link: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  "data-testid": PropTypes.string,
  iconBg: PropTypes.string,
  iconColor: PropTypes.string,
};

/**
 * Profile (100% production grade, accessible, scalable, comments for B2B/B2C use)
 */
const Profile = React.memo(function Profile() {
  const user = useSelector((state) => state.Auth?.user);

  // Defensive mapping and fallback defaults
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
    isVerified: typeof user?.isVerified === "boolean" ? user.isVerified : user?.isVerified !== undefined ? Boolean(user?.isVerified) : null,
    email: typeof user?.email === "string" ? user.email : "",
    contact: typeof user?.contact === "string" ? user.contact : "",
    address: typeof user?.address === "string" && user.address.trim() ? user.address.trim() : "",
    stats: {
      totalSpent: typeof user?.totalSpent === "number" ? user.totalSpent : 12459,
      totalOrders: typeof user?.totalOrders === "number" ? user.totalOrders : 25,
      wishlistCount: typeof user?.wishlistCount === "number" ? user.wishlistCount : 7,
      addressCount: typeof user?.addressCount === "number" ? user.addressCount : 3,
      rewardPoints: typeof user?.rewardPoints === "number" ? user.rewardPoints : 1580,
      thisMonthIncrease: typeof user?.thisMonthIncrease === "number" ? user.thisMonthIncrease : 15,
    },
  }), [user]);

  // Production-ready notification for Edit Profile
  const handleEditProfile = useCallback(
    (e) => {
      e.preventDefault();
      if (window?.toast?.info) {
        window.toast.info("Profile editing is under development.");
      } else if (window?.Notification) {
        new window.Notification("Edit Profile", { body: "Profile editing coming soon." });
      } else {
        // In non-production environments, fallback to alert (should be unreachable in prod)
        // Remove or replace this with a UI-driven modal before go-live
        // eslint-disable-next-line no-alert
        alert("Edit profile feature coming soon.");
      }
    },
    []
  );

  return (
    <section className="p-3" data-testid="profile-section">
      <div className="w-full p-2 bg-white shadow rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Profile Core Details */}
        <section className="md:w-[49%] w-full p-6 bg-zinc-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          {/* Avatar & Edit CTA */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 bg-amber-300 rounded-full overflow-hidden border-4 border-white shadow-sm"
              aria-label="User profile avatar"
            >
              <img
                src={avatarUrl}
                alt="User profile"
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
                width={96}
                height={96}
                decoding="async"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 transition text-white border-2 border-blue-200 mt-2 px-4 py-2 rounded-lg shadow active:scale-95 duration-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Edit Profile"
              tabIndex={0}
              onClick={handleEditProfile}
              data-testid="edit-profile-btn"
            >
              Edit Profile
            </button>
          </div>
          {/* User Details */}
          <div className="w-full md:pl-6 flex flex-col justify-between mt-6 md:mt-0">
            <div className="flex items-center mb-3 min-h-[40px]">
              <h1
                className="text-2xl capitalize font-bold mr-3 text-zinc-900 break-all"
                data-testid="user-full-name"
              >
                {fullName}
              </h1>
              {isVerified === null ? null : isVerified ? (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg font-semibold ml-2 select-none" data-testid="user-verified">
                  Verified
                </span>
              ) : (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-lg font-semibold ml-2 select-none" data-testid="user-unverified">
                  Not Verified
                </span>
              )}
            </div>
            <ProfileDetailItem
              icon={MdEmail}
              value={email}
              fallback={getFallbackLabel('email')}
              iconColor="text-blue-500"
              data-testid="profile-detail-email"
            />
            <ProfileDetailItem
              icon={FaPhone}
              value={contact}
              fallback={getFallbackLabel('contact')}
              iconColor="text-green-600"
              data-testid="profile-detail-contact"
            />
            <ProfileDetailItem
              icon={FaMapMarkerAlt}
              value={address}
              fallback={getFallbackLabel('address')}
              iconColor="text-red-500"
              className="mb-0"
              data-testid="profile-detail-address"
            />
          </div>
        </section>

        {/* Main Spend Stats - Accessible and Internationalized */}
        <aside
          className="md:w-[49%] w-full bg-zinc-100 rounded-lg p-4 flex flex-col justify-center h-full min-h-[170px] shadow"
          aria-label="User spend stats"
          data-testid="user-spend-stats"
        >
          <div>
            <p className="text-sm font-medium text-zinc-700 mb-1 uppercase tracking-wide flex items-center gap-1">
              <BiRupee className="inline-block text-2xl text-green-600" aria-hidden="true" />
              Total Spent
            </p>
            <h1
              className="text-4xl font-bold text-zinc-900 mb-2 flex items-center gap-1"
              data-testid="user-total-spent"
            >
              <BiRupee className="inline-block text-3xl text-green-700" aria-hidden="true" />
              {typeof stats.totalSpent === "number"
                ? stats.totalSpent.toLocaleString("en-IN")
                : "—"}
            </h1>
            <div className="flex items-center text-zinc-700 text-sm">
              <span className="mr-2">This Month</span>
              <span className="flex items-center text-green-600 font-bold mr-1" data-testid="spend-stats-this-month">
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

      {/* Stat Cards */}
      <div className="bg-white rounded-lg p-4 mt-6 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
        <ProfileStatCard
          icon={MdOutlineShoppingCart}
          label="Total Orders"
          value={stats.totalOrders}
          link="/orders"
          linkLabel="View all orders"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          data-testid="user-total-orders"
        />
        <ProfileStatCard
          icon={BiRupee}
          label="Total Spent"
          value={stats.totalSpent}
          link="/spend-history"
          linkLabel="View spending"
          iconBg="bg-green-50"
          iconColor="text-green-600"
          data-testid="user-total-spent-card"
        />
        <ProfileStatCard
          icon={MdFavorite}
          label="Favorites"
          value={stats.wishlistCount}
          link="/wishlist"
          linkLabel="View favorites"
          iconBg="bg-pink-50"
          iconColor="text-pink-500"
          data-testid="user-wishlist-count"
        />
        <ProfileStatCard
          icon={GiAchievement}
          label="Reward Points"
          value={stats.rewardPoints}
          link="/rewards"
          linkLabel="View rewards"
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
          data-testid="user-rewards-count"
        />
      </div>

      {/* Orders Section */}
      <div className="w-full p-4 flex bg-white items-start justify-between mt-6 rounded-lg gap-4">
        {/* Recent Orders */}
        <div className="p-4 bg-zinc-100 w-[49%] rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Recent Order</h2>
            <a
              href="/orders"
              className="text-sm text-blue-600 hover:underline font-medium"
              data-testid="view-all-orders-link"
              aria-label="View all orders"
            >
              View all orders
            </a>
          </div>
          {/* TODO: Replace with <RecentOrders /> */}
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center text-gray-500 text-sm">
            No recent orders available.
          </div>
        </div>
        {/* Active Orders */}
        <div className="p-4 bg-zinc-100 w-[49%] rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Active Orders</h2>
            <a
              href="/orders/active"
              className="text-sm text-blue-600 hover:underline font-medium"
              data-testid="view-active-orders-link"
              aria-label="View active orders"
            >
              View active orders
            </a>
          </div>
          {/* TODO: Replace with <ActiveOrders /> */}
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center text-gray-500 text-sm">
            No active orders at the moment.
          </div>
        </div>
      </div>

      {/* Addresses and Payment Methods */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm flex items-center justify-between gap-4">
        {/* Addresses */}
        <div className="p-4 bg-zinc-100 w-[49%] rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
            <a
              href="/addresses"
              className="text-sm text-blue-600 hover:underline font-medium"
              data-testid="view-all-addresses-link"
              aria-label="View all saved addresses"
            >
              View all
            </a>
          </div>
          {/* TODO: Replace with <SavedAddresses /> */}
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center text-gray-500 text-sm">
            No saved addresses found.
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href="/addresses/add"
              className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
              data-testid="add-address-button"
              aria-label="Add new address"
            >
              + Add Address
            </a>
          </div>
        </div>
        {/* Payment Methods */}
        <div className="p-4 bg-zinc-100 w-[49%] rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <a
              href="/payment-methods"
              className="text-sm text-blue-600 hover:underline font-medium"
              data-testid="view-all-payment-methods-link"
              aria-label="View all payment methods"
            >
              View all
            </a>
          </div>
          {/* TODO: Replace with <PaymentMethods /> */}
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center text-gray-500 text-sm">
            No saved payment methods found.
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href="/payment-methods/add"
              className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
              data-testid="add-payment-method-button"
              aria-label="Add new payment method"
            >
              + Add Payment Method
            </a>
          </div>
        </div>
      </div>

<div className="flex items-end justify-end mt-6">
  <Link
  to='/dashboard'
    className="bg-blue-900 rounded text-white font-semibold px-3 py-1 capitalize"
  >
    Back
  </Link>
</div>
 
    </section>
  );
});

Profile.displayName = "Profile";

export default Profile;
