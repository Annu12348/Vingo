import React, { memo } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

/**
 * Industrial-grade, production-ready HomeFooter.
 * - Uses React.memo for render optimization.
 * - All images use loading="lazy" for perf.
 * - All links have appropriate a11y/SEO attributes.
 * - Interactive elements are keyboard accessible.
 * - ARIA roles/labels for accessibility.
 * - Only recalculates copyright year once.
 * - Minimum DOM, production class/utility names, and optimized order.
 */

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <FaFacebookF aria-hidden="true" />,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <FaTwitter aria-hidden="true" />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <FaInstagram aria-hidden="true" />,
  },
];

const HomeFooter = () => (
  <footer
    id="footer"
    className="border-t border-[#E8E8E8] bg-[#F5F5F5] py-12 md:py-14"
    role="contentinfo"
    aria-label="Site Footer"
  >
    <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 md:flex-row md:justify-between md:px-10 lg:px-14">
      {/* Download App Section */}
      <section aria-labelledby="download-app-title">
        <p
          id="download-app-title"
          className="text-lg font-semibold text-[#1A1A1A]"
        >
          Download the App
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white transition hover:bg-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            aria-label="Download QuickBite on Google Play"
          >
            <img
              src="/playstore.png"
              alt="Google Play Store"
              className="h-8 w-8 object-contain"
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              draggable="false"
            />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase tracking-wide text-white/80">
                Get it on
              </span>
              <span className="text-sm font-semibold">Google Play</span>
            </span>
          </a>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[#1A1A1A] transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            aria-label="Download QuickBite on Apple App Store"
          >
            <img
              src="/apple.png"
              alt="Apple App Store"
              className="h-8 w-8 object-contain"
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              draggable="false"
            />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[10px] uppercase tracking-wide text-[#666]">
                Download on the
              </span>
              <span className="text-sm font-semibold">App Store</span>
            </span>
          </a>
        </div>
      </section>

      {/* Footer Links and Social */}
      <section className="flex flex-col gap-6 text-sm text-[#333]" aria-label="Footer Navigation">
        <nav
          className="flex flex-wrap gap-x-6 gap-y-2"
          aria-label="Main footer navigation"
        >
          <a
            href="/about"
            className="font-medium hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            tabIndex={0}
          >
            About Us
          </a>
          <a
            href="/contact"
            className="font-medium hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            tabIndex={0}
          >
            Contact
          </a>
          <a
            href="/help"
            className="font-medium hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            tabIndex={0}
          >
            Help &amp; Support
          </a>
          <span
            className="font-medium text-[#666] pointer-events-none select-none"
            aria-disabled="true"
            tabIndex={-1}
          >
            Central Line
          </span>
        </nav>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="/terms"
            className="hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            tabIndex={0}
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/privacy"
            className="hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            tabIndex={0}
          >
            Privacy Policy
          </a>

          {/* Social Icons */}
          <div className="flex gap-3 text-[#1A1A1A]" aria-label="Social media links">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`QuickBite on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:text-[#FF7A00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
                tabIndex={0}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#888] select-none" aria-label="Copyright">
          © {currentYear} QuickBite. All rights reserved.
        </p>
      </section>
    </div>
  </footer>
);

export default memo(HomeFooter);
