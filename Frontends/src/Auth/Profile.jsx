import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { GoArrowUp } from "react-icons/go";
import PropTypes from "prop-types";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1627292441194-0280c19e74e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fG1vZGVsfGVufDB8fDB8fHww";

const ProfileDetailItem = ({ icon: Icon, value, fallback, className = "" }) => (
  <div className={`flex items-center gap-3 mb-2 text-zinc-700 ${className}`}>
    <Icon className="text-lg" />
    <span className="text-base font-medium break-words">
      {value || fallback}
    </span>
  </div>
);

ProfileDetailItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.string,
  fallback: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const Profile = () => {
  const user = useSelector((store) => store.Auth?.user);
  const {
    avatarUrl,
    fullName,
    isVerified,
    email,
    contact,
    address,
  } = useMemo(() => {
    return {
      avatarUrl: user?.avatar || DEFAULT_AVATAR,
      fullName: user?.FullName || "—",
      isVerified: user?.isVerified === undefined ? null : !!user.isVerified,
      email: user?.email,
      contact: user?.contact,
      address:
        user?.address && typeof user.address === "string"
          ? user.address.trim()
          : "",
    };
  }, [user]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    alert("Edit profile feature coming soon.");
  };

  return (
    <section className="p-3">
      <div className="w-full p-1 shadow rounded bg-white flex flex-col md:flex-row items-center justify-between gap-4">
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
                draggable={false}
              />
            </div>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 transition text-white border-2 border-blue-200 mt-2 px-4 py-2 rounded-lg font-medium shadow active:scale-95 duration-100"
              aria-label="Edit Profile"
              tabIndex={0}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
          {/* Profile Details */}
          <div className="w-full md:pl-6 flex flex-col justify-between mt-6 md:mt-0">
            <div className="flex items-center mb-3">
              <h1 className="text-2xl capitalize font-bold mr-3 text-zinc-900 break-all" data-testid="user-full-name">
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
        <aside className="md:w-[49%] w-full bg-zinc-100 rounded-lg p-4 flex flex-col justify-center h-full min-h-[170px] shadow">
          {/* Ideally, this part should be data-driven from backend/user stats */}
          <div>
            <p className="text-sm font-medium text-zinc-700 mb-1 uppercase tracking-wide">
              Total Spent
            </p>
            <h1 className="text-4xl font-bold text-zinc-900 mb-2" data-testid="user-total-spent">
              ₹12,459
            </h1>
            <div className="flex items-center text-zinc-700 text-sm">
              <span className="mr-2">This Month</span>
              <span className="flex items-center text-green-600 font-bold mr-1">
                <GoArrowUp className="inline-block text-lg" />
                15%
              </span>
              <span className="text-zinc-500 font-normal">(↑ increased)</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default React.memo(Profile);
