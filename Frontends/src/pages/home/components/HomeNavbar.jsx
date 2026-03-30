import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

const HomeNavbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navLink = (to, label, isActive) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`relative pb-1 text-sm font-medium text-white/95 transition hover:text-white ${
        isActive ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#FF7A00]" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="absolute left-0  right-0 top-0 z-50 px-4 pt-5 md:px-10 lg:px-14">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 rotate-45 items-center justify-center rounded-md bg-[#FF7A00] shadow-sm">
          <FaBolt className="-rotate-45 text-lg text-white" aria-hidden />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">QuickBite</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {navLink("/", "Home", pathname === "/")}
          {navLink("/restaurants", "restaurants", pathname==="/restaurants")}
          {navLink("/Contact", "Contact", pathname==="/Contact")}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white">
            Login
          </Link>
          <Link
            to="/login"
            className="rounded-lg bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E66D00]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg border-2 border-[#1A1A1A] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5F5F5]"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-4 flex max-w-[1400px] flex-col gap-3 rounded-xl border border-white/20 bg-black/50 p-4 backdrop-blur-md md:hidden">
          {navLink("/", "Home", pathname === "/")}
          {navLink({ pathname: "/", hash: "popular-restaurants" }, "Restaurants", false)}
          {navLink({ pathname: "/", hash: "footer" }, "Contact", false)}
          <hr className="border-white/20" />
          <Link to="/login" className="text-sm font-medium text-white" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg border-2 border-white bg-white py-2.5 text-center text-sm font-semibold text-[#1A1A1A]"
            onClick={() => setOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;
