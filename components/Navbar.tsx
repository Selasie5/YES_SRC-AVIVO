"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretRight, X, List } from "@phosphor-icons/react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(pathname !== "/");
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
    } else if (window.scrollY <= 20) {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else if (isHome) {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHome]);

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#yebs", label: "YEBS" },
    { href: "/#why-us", label: "Why Afrovivo" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Announcement Banner — always visible */}
      {isBannerVisible && (
        <header className="fixed top-0 left-0 right-0 w-full z-50">
          <div className="bg-[#1a1a1a] text-white py-2.5 px-4 flex items-center justify-center relative w-full text-sm font-[family-name:var(--font-inter-tight)]">
            <div className="flex items-center gap-3">
              <span className="text-[#ff5c00] font-semibold">New</span>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-white tracking-tight">Youth Energy Bridge Summit 2026</span>
              <Link href="/#yebs" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 ml-1">
                Register as a delegate
                <CaretRight size={12} weight="bold" />
              </Link>
            </div>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="absolute right-4 md:right-6 text-gray-400 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X size={16} />
            </button>
          </div>
        </header>
      )}

      {/* Main Navbar — hides/shows on scroll */}
      <header
        className={`fixed left-0 right-0 w-full z-40 transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isBannerVisible ? "top-[40px]" : "top-0"}`}
      >
        <div className={`w-full transition-colors duration-300 ${
          isScrolled ? "bg-white text-black border-b border-gray-200" : "bg-transparent text-white"
        }`}>
          <div className={`max-w-[1600px] mx-auto px-6 h-20 ${isScrolled ? "grid grid-cols-3 items-center" : "flex items-center justify-between"}`}>
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className={`font-bold text-2xl tracking-tight font-[family-name:var(--font-inter-tight)] ${isScrolled ? "text-black" : "text-white"}`}>
                Afrovivo
              </div>
            </Link>

            {/* Nav Links */}
            <nav className={`hidden md:flex items-center gap-8 ${isScrolled ? "justify-center" : "ml-12"}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-500 hover:text-black" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: CTA Button + Mobile Menu Toggle */}
            <div className={`flex items-center gap-3 ${isScrolled ? "justify-self-end" : ""}`}>
              <Link
                href="/contact"
                className={`px-6 py-2.5 rounded text-sm font-semibold transition-all ${
                  isScrolled
                    ? "bg-gray-800 text-white hover:bg-black"
                    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                Get Started
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white pt-[120px] md:hidden">
          <nav className="flex flex-col items-center gap-8 px-6 py-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors font-[family-name:var(--font-inter-tight)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 bg-gray-900 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
