"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "@phosphor-icons/react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("afrovivo_cookie_consent");
    if (!hasAccepted) {
      // Small delay so it doesn't jarringly appear the very millisecond the page loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("afrovivo_cookie_consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
        >
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-6 relative overflow-hidden font-[family-name:var(--font-inter-tight)]">
            <button 
              onClick={handleAccept}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} weight="bold" />
            </button>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 mb-2 pr-6">
              We value your privacy
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We use cookies to improve your browsing experience, serve personalized content, and analyze our traffic. By continuing to use this site, you consent to our use of cookies.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Accept
              </button>
              <Link
                href="/privacy"
                onClick={() => setIsVisible(false)}
                className="flex-1 text-center text-gray-700 bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
