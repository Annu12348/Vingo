import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import HomeNavbar from "./HomeNavbar";
import Search from "./Search";

const HERO_IMG =
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1920&q=80";

const HeroSection = () => {
  return (
    <section className="relative min-h-[min(100vh,920px)] w-full overflow-hidden rounded-b-3xl">
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />

      <HomeNavbar />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-10 px-4 pb-16 pt-28 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14 lg:pt-32">
        <div className="w-full max-w-xl shrink-0">
          <Search />








        </div>

        <div className="flex w-full max-w-lg flex-col items-start md:items-end md:text-right">
          <h1 className="font-display text-4xl font-semibold italic leading-tight text-white drop-shadow-md sm:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
            Fast, Fresh, Delivered to Your Doorstep!
          </h1>
          <div className="mt-8 flex flex-wrap gap-4 md:justify-end">
            <Link
              to="/login"
              className="rounded-lg bg-[#FF7A00] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#E66D00]"
            >
              Explore Menu
            </Link>
            <Link
              to="/restaurants"
              className="rounded-lg border-2 border-[#1A1A1A] bg-white px-7 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5F5F5]"
            >
              View Restaurants
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 md:justify-end">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white transition hover:bg-[#333]"
            >
              <img src="/playstore.png" alt="" className="h-8 w-8 object-contain" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wide text-white/80">Get it on</span>
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[#1A1A1A] transition hover:bg-[#F5F5F5]"
            >
              <img src="/apple.png" alt="" className="h-8 w-8 object-contain" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wide text-[#666]">Download on the</span>
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
