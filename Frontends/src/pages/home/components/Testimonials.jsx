import React, { useRef, useCallback, memo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

// Deduplicate TESTIMONIALS to ensure unique keys and avoid unnecessary re-renders
const TESTIMONIALS = [
  {
    id: 'la-1',
    quote:
      "QuickBite has completely changed how we order dinner. The food arrives hot, and the app is so easy to use!",
    city: "Los Angeles",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 'mumbai-1',
    quote:
      "Best variety of restaurants in one place. Delivery is always on time — highly recommend to everyone.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 'chi-1',
    quote:
      "Fresh ingredients, great offers, and friendly support. QuickBite is our go-to for weekend treats.",
    city: "Chicago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  // Repeats for carousel continuity, but with unique IDs
  {
    id: 'la-2',
    quote:
      "QuickBite has completely changed how we order dinner. The food arrives hot, and the app is so easy to use!",
    city: "Los Angeles",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 'mumbai-2',
    quote:
      "Best variety of restaurants in one place. Delivery is always on time — highly recommend to everyone.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 'chi-2',
    quote:
      "Fresh ingredients, great offers, and friendly support. QuickBite is our go-to for weekend treats.",
    city: "Chicago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

// Memoized Testimonial Card for performance
const TestimonialCard = memo(function TestimonialCard({ quote, city, avatar }) {
  return (
    <article
      className="flex w-[min(100%,320px)] shrink-0 flex-col items-center rounded-2xl border border-[#EFEFEF] bg-[#FAFAFA] px-6 py-8 text-center shadow-sm sm:w-[300px]"
    >
      <img
        src={avatar}
        alt={`Testimonial from ${city}`}
        className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
        loading="lazy"
        draggable="false"
      />
      <p className="mt-6 text-sm italic leading-relaxed text-[#444] md:text-[15px]">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#1A1A1A]">
        <FaHeart className="text-[#FF7A00]" aria-hidden />
        <span>{city}</span>
      </div>
    </article>
  );
});

const Testimonials = () => {
  const scroller = useRef(null);

  // UseCallback to avoid function recreation for better performance
  const scroll = useCallback((dir) => {
    const el = scroller.current;
    if (!el) return;
    const scrollAmount = Math.floor(Math.min(el.clientWidth * 0.9, 340));
    el.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  }, []);

  // Accessibility: handle arrow keys for carousel navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        scroll(-1);
      } else if (e.key === "ArrowRight") {
        scroll(1);
      }
    },
    [scroll]
  );

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 lg:px-14">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[26px]">
          What Our Customers Say
        </h2>

        {/* Improve accessibility: Add keyboard support and aria-controls */}
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-[55%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] md:flex lg:left-0"
          aria-label="Previous testimonial"
          aria-controls="testimonials-scroller"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="absolute right-2 top-[55%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F0F0F0] text-[#555] shadow-sm transition hover:bg-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] md:flex lg:right-0"
          aria-label="Next testimonial"
          aria-controls="testimonials-scroller"
        >
          <FaChevronRight />
        </button>

        <div
          ref={scroller}
          id="testimonials-scroller"
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth"
          tabIndex={0}
          role="region"
          aria-label="Testimonials"
          onKeyDown={handleKeyDown}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              city={t.city}
              avatar={t.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
