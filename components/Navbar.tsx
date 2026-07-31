"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretRight, X, List } from "@phosphor-icons/react";
import NavMegaMenu from "./NavMegaMenu";
import { navigation } from "../data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const [isScrolled, setIsScrolled] = useState(pathname !== "/");
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
    } else if (window.scrollY <= 20) {
      setIsScrolled(false);
    }
  }, [isHome]);

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

  if (isAdmin) return null;

  return (
    <>
      {isBannerVisible && (
        <header className="fixed top-0 left-0 right-0 w-full z-50">
          <div className="relative flex w-full items-center justify-center bg-[#1a1a1a] px-10 py-2.5 text-xs font-[family-name:var(--font-inter-tight)] text-white sm:text-sm">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
              <span className="font-semibold text-[#ff5c00]">New</span>
              <span className="hidden text-gray-600 sm:inline">|</span>
              <span className="font-semibold tracking-tight text-white">
                <span className="sm:hidden">YEBS 2026</span>
                <span className="hidden sm:inline">Youth Energy Bridge Summit 2026</span>
              </span>
              <Link
                href="/yebs/register/delegate"
                className="ml-0 flex items-center gap-1 text-gray-400 transition-colors hover:text-white sm:ml-1"
              >
                <span className="sm:hidden">Register</span>
                <span className="hidden sm:inline">Register as a delegate</span>
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

      <header
        className={`fixed left-0 right-0 w-full z-40 transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isBannerVisible ? "top-[40px]" : "top-0"}`}
      >
        <div
          className={`w-full transition-colors duration-300 ${
            isScrolled ? "bg-white text-black border-b border-gray-200" : "bg-transparent text-white"
          }`}
        >
          <div
            className={`relative max-w-[1600px] mx-auto px-6 h-20 ${
              isScrolled ? "grid grid-cols-3 items-center" : "flex items-center justify-between"
            }`}
          >
            <Link href="/" className="flex items-center gap-2">
              <div
                className={`font-bold text-2xl tracking-tight font-[family-name:var(--font-inter-tight)] ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                Afrovivo
              </div>
            </Link>

            <NavMegaMenu activeMenu={activeMenu} onActivate={setActiveMenu} isScrolled={isScrolled} />

            <div className={`flex items-center gap-3 ${isScrolled ? "justify-self-end" : ""}`}>
              <Link
                href="/contact"
                className={`hidden rounded px-4 py-2.5 text-sm font-semibold transition-all sm:inline-flex sm:px-6 ${
                  isScrolled
                    ? "bg-gray-800 text-white hover:bg-black"
                    : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
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

      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-[60] overflow-y-auto bg-white md:hidden ${
            isBannerVisible ? "pt-[120px]" : "pt-20"
          }`}
        >
          <nav className="flex flex-col gap-6 px-6 py-8">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-inter-tight)]"
                >
                  {item.label}
                </Link>
                {item.columns && (
                  <ul className="mt-3 space-y-2 border-l border-gray-100 pl-4">
                    {item.columns.flatMap((column) =>
                      column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-gray-600 hover:text-gray-900"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex w-fit bg-gray-900 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
