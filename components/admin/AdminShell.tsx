"use client";

import { type ReactNode } from "react";
import {
  Buildings,
  CaretRight,
  CheckCircle,
  GraduationCap,
  Medal,
  SignOut,
  SquaresFour,
  UsersThree,
} from "@phosphor-icons/react";

type AdminShellProps = {
  children: ReactNode;
  onLogout: () => void;
};

const navItems = [
  { label: "Registrations", icon: UsersThree, active: true },
  { label: "Check-in desk", icon: CheckCircle, active: false },
];

export default function AdminShell({ children, onLogout }: AdminShellProps) {
  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#F4F6F8] font-[family-name:var(--font-inter-tight)]">
      <aside className="flex h-full w-64 shrink-0 flex-col justify-between overflow-hidden border-r border-zinc-200/50 bg-zinc-50 px-3 py-5">
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
                return (
                  <div
                    key={item.label}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
                      item.active
                        ? "bg-zinc-200/90 font-medium text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                        : "font-normal text-zinc-500 hover:bg-zinc-200/80 hover:text-black hover:shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" weight={item.active ? "fill" : "regular"} />
                    <span className="flex-1">{item.label}</span>
                    {item.active && (
                      <CaretRight className="h-3.5 w-3.5 shrink-0 text-zinc-400" weight="bold" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-1">
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Registration types
              </p>
              {[
                { label: "Delegates", icon: GraduationCap },
                { label: "Sponsors", icon: Medal },
                { label: "Partners", icon: Buildings },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-normal text-zinc-500"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onLogout}
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
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-100 bg-white px-6">
          <div className="flex items-center gap-2 text-[12px] font-normal text-zinc-400">
            <span>Afrovivo</span>
            <CaretRight className="h-3.5 w-3.5 text-zinc-300" weight="bold" />
            <span className="font-medium text-zinc-800">Registrations</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <SquaresFour className="h-4 w-4" />
            YEBS 2026
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
