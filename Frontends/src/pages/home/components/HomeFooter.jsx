import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const HomeFooter = () => {
  return (
    <footer id="footer" className="border-t border-[#E8E8E8] bg-[#F5F5F5] py-12 md:py-14">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 md:flex-row md:justify-between md:px-10 lg:px-14">
        <div>
          <p className="text-lg font-semibold text-[#1A1A1A]">Download the App</p>
          <div className="mt-4 flex flex-wrap gap-3">
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
              className="flex items-center gap-2 rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[#1A1A1A] transition hover:bg-white/90"
            >
              <img src="/apple.png" alt="" className="h-8 w-8 object-contain" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wide text-[#666]">Download on the</span>
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-sm text-[#333]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#footer" className="font-medium hover:text-[#FF7A00]">
              About Us
            </a>
            <a href="#footer" className="font-medium hover:text-[#FF7A00]">
              Contact
            </a>
            <a href="#footer" className="font-medium hover:text-[#FF7A00]">
              Help &amp; Support
            </a>
            <span className="font-medium text-[#666]">Central Line</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#footer" className="hover:text-[#FF7A00]">
              Terms &amp; Conditions
            </a>
            <a href="#footer" className="hover:text-[#FF7A00]">
              Privacy Policy
            </a>
            <div className="flex gap-3 text-[#1A1A1A]">
              <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:text-[#FF7A00]">
                <FaFacebookF />
              </a>
              <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:text-[#FF7A00]">
                <FaTwitter />
              </a>
              <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:text-[#FF7A00]">
                <FaInstagram />
              </a>
            </div>
          </div>
          <p className="text-xs text-[#888]">© {new Date().getFullYear()} QuickBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
