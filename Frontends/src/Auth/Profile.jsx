import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavorite, MdCardGiftcard } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { GoArrowUp } from "react-icons/go";
import { GiAchievement } from "react-icons/gi";

// CONSTANTS
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1627292441194-0280c19e74e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fG1vZGVsfGVufDB8fDB8fHww";

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

/**
 * @component ProfileDetailItem
 * @description Item row for displaying a profile detail with icon
 */
const ProfileDetailItem = React.memo(function ProfileDetailItem({
  icon: Icon,
  value,
  fallback,
  iconColor = "text-blue-500",
  className = "",
}) {
  const displayValue =
    value && typeof value === "string" && value.trim() ? value : fallback;
  return (
    <div
      className={`flex items-center gap-3 mb-2 text-zinc-700 ${className}`}
      role="contentinfo"
      data-testid={`profile-detail-${Icon.displayName || Icon.name || "icon"}`}
    >
      <Icon className={`text-lg ${iconColor}`} aria-hidden="true" focusable="false" />
      <span className="text-base font-medium break-words" data-testid="profile-detail-value">
        {displayValue}
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
  iconColor: PropTypes.string,
};

/**
 * @component ProfileStatCard
 * @description Card for displaying a profile metric/stat. Icon (optional), label, value, link
 * 100% industrial/professional colors and best icons picked for each stat.
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
        <div className={`flex items-center justify-center h-14 w-14 ${iconBg} rounded-full mr-4`} aria-hidden="true">
          <Icon className={`text-3xl ${iconColor}`} />
        </div>
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
 * @component Profile
 * @description Main user profile landing section.
 */
const Profile = React.memo(function Profile() {
  const user = useSelector((state) => state.Auth?.user);

  const {
    avatarUrl,
    fullName,
    isVerified,
    email,
    contact,
    address,
    stats,
  } = useMemo(() => {
    return {
      avatarUrl:
        typeof user?.avatar === "string" && user.avatar.trim()
          ? user.avatar
          : DEFAULT_AVATAR,
      fullName:
        typeof user?.FullName === "string" && user.FullName.trim()
          ? user.FullName
          : "—",
      isVerified:
        typeof user?.isVerified === "boolean"
          ? user.isVerified
          : typeof user?.isVerified !== "undefined"
            ? Boolean(user?.isVerified)
            : null,
      email: typeof user?.email === "string" ? user.email : "",
      contact: typeof user?.contact === "string" ? user.contact : "",
      address:
        typeof user?.address === "string" && user.address.trim()
          ? user.address.trim()
          : "",
      stats: {
        totalSpent:
          typeof user?.totalSpent === "number"
            ? user.totalSpent
            : 12459,
        totalOrders:
          typeof user?.totalOrders === "number"
            ? user.totalOrders
            : 25,
        wishlistCount:
          typeof user?.wishlistCount === "number"
            ? user.wishlistCount
            : 7,
        addressCount:
          typeof user?.addressCount === "number"
            ? user.addressCount
            : 3,
        rewardPoints:
          typeof user?.rewardPoints === "number"
            ? user.rewardPoints
            : 1580,
        thisMonthIncrease:
          typeof user?.thisMonthIncrease === "number"
            ? user.thisMonthIncrease
            : 15,
      },
    };
  }, [user]);

  // Centralized Production-friendly Edit Handler (updates as needed)
  const handleEditProfile = useCallback(
    (e) => {
      e.preventDefault();
      // Ideally this is replaced with a production modal/notification/redirect
      if (window?.toast?.info) {
        window.toast.info("Edit profile feature coming soon.");
      } else {
        // fallback for environments without toast
        // Remove/replace for actual production
        // eslint-disable-next-line no-alert
        alert("Edit profile feature coming soon.");
      }
    },
    []
  );

  return (
    <section className="p-3" data-testid="profile-section">
      <div className="w-full p-2 bg-white shadow rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Profile Card Section */}
        <section className="md:w-[49%] w-full p-6 bg-zinc-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          {/* Avatar & Edit Button */}
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
          {/* Profile Detail Fields */}
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
                  Verified User
                </span>
              ) : (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-lg font-semibold ml-2 select-none" data-testid="user-unverified">
                  Unverified
                </span>
              )}
            </div>
            <ProfileDetailItem
              icon={MdEmail}
              value={email}
              fallback="Not provided"
              iconColor="text-blue-500"
            />
            <ProfileDetailItem
              icon={FaPhone}
              value={contact}
              fallback="Not provided"
              iconColor="text-green-600"
            />
            <ProfileDetailItem
              icon={FaMapMarkerAlt}
              value={address}
              fallback="No address provided"
              iconColor="text-red-500"
              className="mb-0"
            />
          </div>
        </section>

        {/* Main Spend Stats */}
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

      <div className="">
        <div className="p-4 bg-white w-[50%] rounded-lg mt-4 shadow-sm">
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
          {/* TODO: Replace the sample below with a <RecentOrders/> component or map recent orders */}
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center text-gray-500 text-sm">
            No recent orders available.
          </div>
        </div>
        
      </div>


    </section>
  );
});

Profile.displayName = "Profile";

// Module export as default - Strict memo for perf
export default Profile;
