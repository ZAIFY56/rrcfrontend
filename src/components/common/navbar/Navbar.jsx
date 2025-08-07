import { useState, useCallback } from "react";
import logoImg from "/Vector.png";
import { Button } from "@/components/common";
import { FaArrowRight, FaTimes, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Services", path: "/#services" },
  { label: "About", path: "/#about" },
  // { label: "Track Order", path: "/#track-order" },
  // { label: "Careers", path: "/#careers" },
  { label: "Latest News", path: "/#news-and-articles" },
  { label: "Contact", path: "/#contact-us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="container mx-auto px-2 md:px-2 lg:px-8 xl:px-12 2xl:px-12 py-3 relative">
      <div className="flex justify-between items-center">
        <div className="w-32 md:w-[10rem] lg:w-[12rem] h-[4rem]">
          <img
            onClick={() => navigate("/")}
            src={logoImg}
            alt="Company Logo"
            className="w-full cursor-pointer h-full object-contain"
            width={220}
            height={61}
            loading="lazy"
          />
        </div>

        <nav
          className="hidden md:flex gap-4 lg:gap-10"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center justify-center  md:text-sm lg:text-[16px] 2xl:text-[20px] text-gray-800 hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button
              variant="primary"
              icon={<FaArrowRight aria-hidden="true" />}
              className="md:!w-[133px] lg:!w-[151px] xl:!w-[171px] 2xl:!w-[191px] h-[48px] w-auto !text-xs lg:!text-md xl:text-lg 2xl:!text-[16px]"
              onClick={() => {
                const phoneNumber = "+447701000420";
                // Open phone dialer with the number
                window.location.href = `tel:${phoneNumber}`;
              }}
            >
              Call Now
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="primary"
              icon={<FaArrowRight aria-hidden="true" />}
              className="md:!w-[133px] lg:!w-[151px] xl:!w-[171px] 2xl:!w-[191px] h-[48px] w-auto !text-xs lg:!text-md xl:text-lg 2xl:!text-[16px]"
              onClick={() => {
                const phoneNumber = "+447701000420";
                // Open phone dialer with the number
                window.location.href = `tel:${phoneNumber}`;
              }}
            >
              Call Now
            </Button>
            <button
              onClick={toggleMenu}
              className="p-1.5 text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" aria-hidden="true" />
              ) : (
                <FaBars className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`
          md:hidden bg-white shadow-lg rounded-b-xl
          absolute left-0 right-0 z-50
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col divide-y divide-gray-100">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="px-6 py-4 text-gray-800 hover:text-primary transition-colors duration-200"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
