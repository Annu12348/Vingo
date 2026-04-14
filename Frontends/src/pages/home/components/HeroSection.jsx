import React, { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import HomeNavbar from "./HomeNavbar";
import { useSelector } from "react-redux";
import useModal from "../../../hook/useModal";

// Memoized image URL for stable reference
const HERO_IMG = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1920&q=80";

// Strictly optimised for prod, memoize static links/icons
const STORE_LINKS = Object.freeze([
  {
    href: "https://play.google.com",
    img: "/playstore.png",
    labelTop: "Get it on",
    labelBottom: "Google Play",
    dark: true,
  },
  {
    href: "https://apps.apple.com",
    img: "/apple.png",
    labelTop: "Download on the",
    labelBottom: "App Store",
    dark: false,
  }
]);

const HeroSection = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.Auth);

  // UseCallback for stable handler for React perf
  const handleExploreMenu = useCallback(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "user") {
      navigate("/dashboard");
      return;
    }
    showModal({
      title: "Order Restricted",
      message: "Only user accounts can access this menu. Please log in as a user.",
      type: "confirm",
    });
  }, [user, navigate, showModal]);

  // Memoized Hero title (easy for i18n/split A/B in future)
  const heroTitle = useMemo(
    () => "Fast, Fresh, Delivered to Your Doorstep!",
    []
  );

  return (
    <section
      className="relative min-h-[min(100vh,920px)] w-full overflow-hidden rounded-b-3xl"
      aria-label="Hero Banner"
    >
      <img
        src={HERO_IMG}
        alt="Delicious food on table"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35 pointer-events-none" />

      {/* Accessibility-first: Navbar in logical order, semantic landmark */}
      <HomeNavbar />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-10 px-4 pb-16 pt-28 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14 lg:pt-32">
        <div className="w-full max-w-xl shrink-0" aria-label="Site Quick Search">
          <Search />
        </div>
        <div className="flex w-full max-w-lg flex-col items-start md:items-end md:text-right">
          <h1
            className="font-display text-4xl font-semibold italic leading-tight text-white drop-shadow-md sm:text-5xl lg:text-[2.75rem] lg:leading-[1.15]"
            tabIndex={0}
            aria-label={heroTitle}
          >
            {heroTitle}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4 md:justify-end">
            <button
              onClick={handleExploreMenu}
              className="rounded-lg bg-[#FF7A00] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#E66D00] focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00]"
              aria-label="Explore Menu"
              tabIndex={0}
              type="button"
            >
              Explore Menu
            </button>
            <Link
              to="/restaurants"
              className="rounded-lg border-2 border-[#1A1A1A] bg-white px-7 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5F5F5] focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A1A]"
              aria-label="View Restaurants"
              tabIndex={0}
            >
              View Restaurants
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 md:justify-end" aria-label="Get the App">
            {STORE_LINKS.map((store, idx) => (
              <a
                key={store.href}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  (store.dark
                    ? "flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white transition hover:bg-[#333] focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    : "flex items-center gap-2 rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[#1A1A1A] transition hover:bg-[#F5F5F5] focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A1A]")
                }
                tabIndex={0}
                aria-label={store.labelBottom}
              >
                <img src={store.img} alt={store.labelBottom} className="h-8 w-8 object-contain" loading="lazy" />
                <span className="flex flex-col text-left leading-tight">
                  <span
                    className={
                      store.dark
                        ? "text-[10px] uppercase tracking-wide text-white/80"
                        : "text-[10px] uppercase tracking-wide text-[#666]"
                    }
                  >
                    {store.labelTop}
                  </span>
                  <span className="text-sm font-semibold">{store.labelBottom}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
