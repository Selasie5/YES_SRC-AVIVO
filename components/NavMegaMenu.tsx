"use client";

import { useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { navigation, type NavItem } from "../data/navigation";

type NavMegaMenuProps = {
  activeMenu: string | null;
  onActivate: (label: string | null) => void;
  isScrolled: boolean;
};

export default function NavMegaMenu({ activeMenu, onActivate, isScrolled }: NavMegaMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeItem = navigation.find((item) => item.label === activeMenu && item.columns);

  const activeTrigger = activeMenu ? triggerRefs.current[activeMenu] : null;
  const containerLeft = containerRef.current?.getBoundingClientRect().left ?? 0;
  const panelLeft = activeTrigger ? activeTrigger.getBoundingClientRect().left - containerLeft : 0;
  const columnCount = activeItem?.columns?.length ?? 1;
  const panelWidth = columnCount > 1 ? 560 : 320;

  return (
    <div
      ref={containerRef}
      className={`relative hidden md:block ${isScrolled ? "justify-self-center" : ""}`}
      onMouseLeave={() => onActivate(null)}
    >
      <nav className={`flex items-center gap-1 ${isScrolled ? "justify-center" : "ml-0"}`}>
        {navigation.map((item) => (
          <NavTrigger
            key={item.label}
            item={item}
            isActive={activeMenu === item.label}
            isScrolled={isScrolled}
            onActivate={onActivate}
            triggerRef={(el) => {
              triggerRefs.current[item.label] = el;
            }}
          />
        ))}
      </nav>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full z-50 pt-3"
            style={{ left: panelLeft, width: panelWidth }}
          >
            <motion.div
              layoutId="nav-mega-panel"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
            >
              <div
                className={`grid gap-6 ${columnCount > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {activeItem.columns!.map((column) => (
                  <div key={column.title}>
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      {column.title}
                    </p>
                    <ul className="space-y-0.5">
                      {column.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              onClick={() => onActivate(null)}
                              className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-gray-200">
                                <Icon size={16} weight="regular" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                                  {link.label}
                                  <CaretRight
                                    size={12}
                                    weight="bold"
                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                  />
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs leading-snug text-gray-500">
                                    {link.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavTrigger({
  item,
  isActive,
  isScrolled,
  onActivate,
  triggerRef,
}: {
  item: NavItem;
  isActive: boolean;
  isScrolled: boolean;
  onActivate: (label: string | null) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const hasMenu = Boolean(item.columns?.length);

  if (!hasMenu) {
    return (
      <Link
        href={item.href}
        className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
          isScrolled ? "text-gray-500 hover:text-black" : "text-white/80 hover:text-white"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      onMouseEnter={() => onActivate(item.label)}
      className={`relative rounded px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? isScrolled
            ? "text-gray-900"
            : "text-white"
          : isScrolled
            ? "text-gray-500 hover:text-black"
            : "text-white/80 hover:text-white"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-trigger-indicator"
          className={`absolute inset-0 rounded ${isScrolled ? "bg-gray-100" : "bg-white/10"}`}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </button>
  );
}
