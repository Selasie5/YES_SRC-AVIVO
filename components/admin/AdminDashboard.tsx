"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Buildings,
  CheckCircle,
  GraduationCap,
  Medal,
  UsersThree,
} from "@phosphor-icons/react";
import type { Registration } from "../../db/schema";
import AdminShell from "./AdminShell";

type Filter = "all" | "delegate" | "sponsor" | "partner";

const statusStyles: Record<Registration["status"], string> = {
  pending: "bg-zinc-50 text-zinc-600 ring-zinc-200",
  approved: "bg-blue-50 text-blue-700 ring-blue-200",
  checked_in: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const typeStyles: Record<Registration["type"], string> = {
  delegate: "bg-violet-50 text-violet-700 ring-violet-200",
  sponsor: "bg-amber-50 text-amber-700 ring-amber-200",
  partner: "bg-sky-50 text-sky-700 ring-sky-200",
};

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void loadRegistrations(true);
  }, [filter]);

  async function loadRegistrations(checkAuth = false) {
    setLoading(true);
    try {
      const query = filter === "all" ? "" : `?type=${filter}`;
      const response = await fetch(`/api/admin/registrations${query}`);
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await response.json();
      setRegistrations(data.registrations ?? []);
      setAuthenticated(true);
    } catch {
      if (checkAuth) setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError("Invalid password");
      return;
    }
    setAuthenticated(true);
    void loadRegistrations();
  }

  async function updateStatus(id: string, status: Registration["status"]) {
    const response = await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) void loadRegistrations();
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
  }

  if (authenticated === null) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#111111]">
        <div
          className="absolute inset-0 bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden />
        <p className="relative z-10 text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div
          className="absolute inset-0 bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden />

        <motion.form
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:max-w-md sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Afrovivo Admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-900">YEBS check-in</h1>
          <p className="mt-2 text-sm text-zinc-500">Sign in to manage registrations and check-ins.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-6 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
          />
          {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Sign in
          </button>
        </motion.form>
      </div>
    );
  }

  const stats = {
    total: registrations.length,
    delegates: registrations.filter((r) => r.type === "delegate").length,
    sponsors: registrations.filter((r) => r.type === "sponsor").length,
    partners: registrations.filter((r) => r.type === "partner").length,
    checkedIn: registrations.filter((r) => r.status === "checked_in").length,
  };

  return (
    <AdminShell onLogout={handleLogout}>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-zinc-600">
            Good day — here is the current registration activity for{" "}
            <span className="font-semibold text-zinc-900">YEBS 2026</span>.
          </p>
        </div>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-wrap lg:items-stretch">
          <StatCard
            label="Total registrations"
            value={stats.total}
            icon={UsersThree}
            highlight
          />
          <StatCard label="Delegates" value={stats.delegates} icon={GraduationCap} />
          <StatCard label="Sponsors" value={stats.sponsors} icon={Medal} />
          <StatCard label="Partners" value={stats.partners} icon={Buildings} />
          <StatCard label="Checked in" value={stats.checkedIn} icon={CheckCircle} />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">All registrations</h2>
              <p className="text-sm text-zinc-500">Approve attendees and check them in on arrival.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["all", "delegate", "sponsor", "partner"] as Filter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                    filter === item
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Organisation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center text-zinc-500">
                      Loading registrations...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <div className="mx-auto max-w-sm">
                        <p className="text-sm font-medium text-zinc-900">No registrations yet</p>
                        <p className="mt-1 text-sm text-zinc-500">
                          Delegate, sponsor, and partner sign-ups will appear here once submitted.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  registrations.map((row) => (
                    <tr key={row.id} className="group transition-colors hover:bg-zinc-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-zinc-900">{row.fullName}</p>
                        {row.roleTitle && (
                          <p className="mt-0.5 text-xs text-zinc-400">{row.roleTitle}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${typeStyles[row.type]}`}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{row.email}</td>
                      <td className="px-4 py-3 text-zinc-600">{row.organization ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[row.status]}`}
                        >
                          {row.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-col items-end justify-end gap-2 sm:flex-row">
                          {row.status !== "approved" && row.status !== "checked_in" && (
                            <button
                              type="button"
                              onClick={() => updateStatus(row.id, "approved")}
                              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                            >
                              Approve
                            </button>
                          )}
                          {row.status !== "checked_in" && (
                            <button
                              type="button"
                              onClick={() => updateStatus(row.id, "checked_in")}
                              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black"
                            >
                              Check in
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border p-4 sm:min-w-[160px] sm:p-5 lg:flex-1 ${
        highlight
          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
          : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs font-medium ${highlight ? "text-white/70" : "text-zinc-500"}`}>
          {label}
        </span>
        <Icon className={`h-4 w-4 shrink-0 ${highlight ? "text-white/80" : "text-zinc-400"}`} weight="regular" />
      </div>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${highlight ? "text-white" : "text-zinc-900"}`}>
        {value}
      </p>
    </div>
  );
}
