"use client";

import { type ReactNode, useState } from "react";
import {
  Buildings,
  CaretRight,
  List,
  SignOut,
  SquaresFour,
  UsersThree,
  X,
} from "@phosphor-icons/react";

type AdminShellProps = {
  children: ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
};

const navItems = [
  { label: "Registrations", id: "registrations", icon: UsersThree },
  { label: "Speakers", id: "speakers", icon: UsersThree },
  { label: "Partners", id: "partners", icon: Buildings },
];

function SidebarContent({ activeTab, onNavigate, onLogout, onMobileClose }: { activeTab: string; onNavigate: (tab: string) => void; onLogout: () => void; onMobileClose?: () => void }) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex h-10 items-center justify-between px-2">
          <div className="min-w-0">
            <span className="block text-[13px] font-semibold leading-none tracking-tight text-zinc-800">
              Afrovivo
            </span>
            <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-wider text-zinc-400">
              YEBS Admin
            </span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-semibold text-white">
            AV
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onMobileClose?.();
                  }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-all duration-150 ${
                    isActive
                      ? "bg-zinc-200/90 font-medium text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                      : "font-normal text-zinc-500 hover:bg-zinc-200/80 hover:text-black hover:shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" weight={isActive ? "fill" : "regular"} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <CaretRight className="h-3.5 w-3.5 shrink-0 text-zinc-400" weight="bold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => {
            onMobileClose?.();
            onLogout();
          }}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-normal text-zinc-500 transition-all duration-150 hover:bg-zinc-200/80 hover:text-black hover:shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
        >
          <SignOut className="h-4 w-4 shrink-0" />
          <span>Sign out</span>
        </button>

        <div className="flex items-center gap-2 border-t border-zinc-200/50 px-1 pt-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-600">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-normal text-zinc-700">Admin user</p>
            <p className="truncate text-[9px] text-zinc-400">YEBS 2026 operations</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminShell({ children, activeTab, onNavigate, onLogout }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#F4F6F8] font-[family-name:var(--font-inter-tight)]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col justify-between overflow-hidden border-r border-zinc-200/50 bg-zinc-50 px-3 py-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent activeTab={activeTab} onNavigate={onNavigate} onLogout={onLogout} onMobileClose={() => setSidebarOpen(false)} />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-zinc-100 bg-white px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
              aria-label="Open menu"
            >
              <List className="h-5 w-5" />
            </button>
            <div className="flex min-w-0 items-center gap-2 truncate text-[12px] font-normal text-zinc-400">
              <span className="hidden sm:inline">Afrovivo</span>
              <CaretRight className="hidden h-3.5 w-3.5 shrink-0 text-zinc-300 sm:block" weight="bold" />
              <span className="truncate font-medium text-zinc-800 capitalize">{activeTab}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-500">
            <SquaresFour className="h-4 w-4" />
            <span className="hidden sm:inline">YEBS 2026</span>
            <span className="sm:hidden">2026</span>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white p-4 sm:p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed right-4 top-4 z-[60] rounded-lg bg-white p-2 text-zinc-600 shadow-md lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
