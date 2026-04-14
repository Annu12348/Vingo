import React, { memo } from "react";

/**
 * Industrial-grade, high-performance, and user-experience optimized SpecialOffers section.
 * - Uses React.memo for render optimization.
 * - Uses loading="lazy" for images.
 * - Provides alt text for accessibility.
 * - Button is accessible and focus-visible.
 * - Added ARIA roles and labels.
 * - CSS classes remain utility-based for maintainability.
 */

const OFFERS = [
  {
    id: 1,
    img: {
      src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      alt: "Special offers banner: 50% off entire order",
    },
    gradient:
      "absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25",
    content: (
      <>
        <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
          Special Offers
        </p>
        <h3 className="mt-2 max-w-[280px] text-2xl font-bold leading-tight text-white md:text-3xl">
          50% OFF ENTIRE ORDER
        </h3>
        <button
          type="button"
          className="mt-6 w-fit rounded-lg border-2 border-white bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="Use code WELCOME50 to get 50% off your entire order"
        >
          Use Code: WELCOME50
        </button>
      </>
    ),
    contentClass: "relative z-10 flex h-full flex-col justify-center p-6 md:p-8",
    align: "left",
  },
  {
    id: 2,
    img: {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      alt: "Burgers special: Get 1+1 Free",
    },
    gradient:
      "absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-transparent",
    content: (
      <>
        <h3 className="max-w-[300px] text-2xl font-bold leading-tight text-white md:text-[26px]">
          Get 1+1 Free On All Burgers!
        </h3>
        <button
          type="button"
          className="mt-6 rounded-lg bg-[#FF7A00] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#E66D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00]"
          aria-label="Order now and get 1+1 free on all burgers"
        >
          ORDER NOW
        </button>
      </>
    ),
    contentClass:
      "relative z-10 flex h-full flex-col items-end justify-center p-6 text-right md:p-8",
    align: "right",
  },
];

const SpecialOffers = () => (
  <section
    className="border-b border-[#E5E5E5] bg-white py-14 md:py-16"
    aria-labelledby="special-offers-title"
    role="region"
  >
    <div className="mx-auto grid max-w-[1400px] gap-5 px-4 md:grid-cols-2 md:px-10 lg:gap-6 lg:px-14">
      {OFFERS.map(({ id, img, gradient, content, contentClass }) => (
        <article
          key={id}
          className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-md md:min-h-[260px]"
          tabIndex="0"
          aria-label={img.alt}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            draggable="false"
            width="900"
            height="400"
            decoding="async"
          />
          <div className={gradient} aria-hidden="true" />
          <div className={contentClass}>{content}</div>
        </article>
      ))}
    </div>
  </section>
);

export default memo(SpecialOffers);
