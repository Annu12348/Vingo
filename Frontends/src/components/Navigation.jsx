import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { setSearchItem } from "../redux/reducer/ItemReducer";
import { FaBolt, FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { RiShoppingCartFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../hook/useAuth";

const ROLE = {
  USER: "user",
  OWNER: "owner",
  DELIVERY: "deliveryBoy",
};

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { user, city } = useSelector(
    (store) => ({ user: store.Auth.user, city: store.Auth.city }),
    shallowEqual
  );
  const shop = useSelector((store) => store.Shop.shop, shallowEqual);
  const cartItems = useSelector((store) => store.Item.cartItems, shallowEqual);

  const [query, setQuery] = useState("");
  const [menuBar, setMenuBar] = useState(false);

  // Debounced Search API Call
  const searchQueryApi = useCallback(
    async (queryParam) => {
      try {
        const cityValue = city?.city ? city.city : "";
        const res = await instance.get(
          `/item/search-item?query=${encodeURIComponent(queryParam)}&city=${encodeURIComponent(cityValue)}`,
          { withCredentials: true }
        );
        dispatch(setSearchItem(res.data.data));
      } catch (err) {
        dispatch(setSearchItem([]));
      }
    },
    [city, dispatch]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        searchQueryApi(query.trim());
      } else {
        dispatch(setSearchItem([]));
      }
    }, 100); // Slightly slower debounce for real use, feel free to tune

    return () => clearTimeout(debounceTimer);
  }, [query, dispatch, searchQueryApi]);

  // Logout Handler
  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  // Derived utility
  const getUserInitial = (u) => (u?.FullName && typeof u.FullName === "string" ? u.FullName[0].toUpperCase() : "");

  // Role-based access logic
  const isOwner = user?.role === ROLE.OWNER;
  const isUser = user?.role === ROLE.USER;
  const isDelivery = user?.role === ROLE.DELIVERY;

  // Render
  return (
    <nav className="w-full fixed z-20 flex items-center justify-center">
      <div className="md:w-[60%] w-full bg-zinc-100 shadow rounded py-2 px-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Go to home">
          <div className="flex h-9 w-9 rotate-45 items-center justify-center rounded-md bg-[#FF7A00] shadow-sm">
            <FaBolt className="-rotate-45 text-lg text-white" />
          </div>
          <span className="text-sm mb-1 font-bold tracking-tight font-display text-[rgb(240,107,41)]">QuickBite</span>
        </Link>

        {/* Desktop Middle Section - Search */}
        <div className="flex w-full items-center justify-end">
          {isUser && (
            <section className="shadow bg-zinc-100 rounded md:mr-13 p-1.5 flex items-center justify-between w-full md:w-[59.5%]">
              <div className="flex items-center gap-1">
                <span className="text-xl text-[rgb(240,107,41)]"><FaLocationDot /></span>
                <h1 className="text-zinc-500 truncate tracking-tight text-[12px]">{city?.city?.slice(0, 8) || ""}</h1>
              </div>
              <div className="flex w-[72%] items-center border-zinc-300 border-l-3 px-3 gap-2">
                <label htmlFor="nav-search" className="text-xl">
                  <CiSearch />
                </label>
                <input
                  id="nav-search"
                  className="outline-none md:py-1.5 py-1 px-1 font-semibold text-zinc-500 w-full text-sm tracking-tight"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search food..."
                  aria-label="Search for food"
                  autoComplete="off"
                />
              </div>
            </section>
          )}

          {/* Right Section Actions */}
          <div className="flex items-center gap-4 justify-center">

            {/* Cart Icon - Only for Users */}
            {isUser && (
              <Link to="/cart" className="text-2xl md:block hidden relative text-[rgb(240,107,41)]" title="Go to cart" aria-label="Open cart">
                <RiShoppingCartFill />
                <span className="text-[12px] absolute -top-1.5 -right-1.5">{cartItems.length > 0 ? cartItems.length : null}</span>
              </Link>
            )}

            {/* Owner Add Food Link */}
            {isOwner && !!shop?.length && (
              <Link
                to="/add-food"
                className="text-[13px] hidden md:flex items-center gap-2 rounded capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5"
                aria-label="Add food item"
              >
                <span className="text-xl"><IoMdAdd /></span>
                add food item
              </Link>
            )}

            {/* Orders */}
            {(isUser || isOwner) && !isDelivery && (
              <Link
                to="/my-order"
                className="text-[11px] relative hidden md:flex items-center gap-2 rounded capitalize font-semibold bg-zinc-200 text-[rgb(240,107,41)] px-3 py-1.5"
                aria-label="My orders"
              >
                <span className="text-xl"><FaFileInvoiceDollar /></span>
                my orders
              </Link>
            )}

            {/* User Profile Link */}
            {isUser && (
              <Link
                to="/profile/user"
                className="bg-[rgb(240,107,41)] md:block hidden uppercase py-0.5 px-2.5 text-white rounded-full"
                aria-label="User profile"
              >
                {getUserInitial(user)}
              </Link>
            )}

            {/* Owner Profile Link */}
            {isOwner && (
              <Link
                to="/profile/owner"
                className="bg-[rgb(240,107,41)] md:block hidden uppercase py-0.5 px-2.5 text-white rounded-full"
                aria-label="Owner profile"
              >
                {getUserInitial(user)}
              </Link>
            )}

            {/* DeliveryBoy Profile Link */}
            {isDelivery && (
              <Link
                to="/profile/deliveryBoy"
                className="bg-[rgb(240,107,41)] md:block hidden uppercase py-0.5 px-2.5 text-white rounded-full"
                aria-label="Delivery profile"
              >
                {getUserInitial(user)}
              </Link>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="px-3 py-2.5 bg-red-500 md:block cursor-pointer hidden rounded-lg text-white font-semibold tracking-tight leading-none"
                aria-label="Logout"
                type="button"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuBar((prev) => !prev)}
          className="text-xl relative z-20  md:hidden text-zinc-800  rounded-full  p-1"
          type="button"
          aria-label={menuBar ? "Close menu" : "Open menu"}
        >
          {menuBar ? <IoMdClose /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuBar && user && (
        <aside
          className="text-sm absolute md:hidden w-full bg-zinc-400 rounded-b-3xl -top-1 p-3"
          tabIndex={-1}
          role="menu"
          aria-label="Navigation drawer"
        >
          <div className="pb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[rgb(240,107,41)] flex items-center justify-center rounded-full text-white text-xl font-bold uppercase">
                {getUserInitial(user)}
              </div>
              <div>
                <span className="block text-xs text-zinc-700 font-medium">Welcome back,</span>
                <h1 className="text-lg font-semibold text-zinc-900 capitalize leading-tight">{user.FullName}</h1>
              </div>
            </div>

            <Link
              to={`/profile/${user.role}`}
              className="flex items-center mt-6 gap-3 border p-2 rounded-xl border-zinc-500"
              role="menuitem"
            >
              <span className="text-4xl text-blue-800"><CgProfile /></span>
              <h3 className="text-xl tracking-tight leading-none capitalize hover:border-blue-500 font-semibold text-zinc-600">
                profile
              </h3>
            </Link>

            {isUser && (
              <Link
                to="/cart"
                className="flex items-center mt-3 gap-3 border p-2 rounded-xl border-zinc-500"
                role="menuitem"
              >
                <span className="text-3xl text-red-800"><RiShoppingCartFill /></span>
                <h3 className="text-xl tracking-tight leading-none capitalize hover:border-blue-500 font-semibold text-zinc-600">
                  order request
                </h3>
              </Link>
            )}
            {isOwner && !!shop?.length && (
              <Link
                to="/add-food"
                className="flex items-center mt-3 gap-3 border p-2 py-2.5 rounded-xl border-zinc-500"
                role="menuitem"
              >
                <span className="text-3xl text-red-800"><IoMdAdd /></span>
                <h3 className="text-xl tracking-tight leading-none capitalize hover:border-blue-500 font-semibold text-zinc-600">
                  add food item
                </h3>
              </Link>
            )}
            {(isUser || isOwner) && !isDelivery && (
              <Link
                to="/my-order"
                className="flex items-center mt-3 gap-3 border p-2 py-2.5 rounded-xl border-zinc-500"
                role="menuitem"
              >
                <span className="text-3xl text-red-800"><FaFileInvoiceDollar /></span>
                <h3 className="text-xl tracking-tight leading-none capitalize hover:border-blue-500 font-semibold text-zinc-600">
                  my orders
                </h3>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-2.5 bg-red-500 text-xl capitalize mt-4 cursor-pointer w-full rounded-lg text-white font-semibold tracking-tight leading-none"
              type="button"
              aria-label="Logout"
            >
              logout
            </button>
          </div>
        </aside>
      )}
    </nav>
  );
};

export default Navigation;
