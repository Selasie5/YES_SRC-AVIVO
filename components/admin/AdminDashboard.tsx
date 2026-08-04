"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Buildings,
  CheckCircle,
  GraduationCap,
  Medal,
  UsersThree,
  Plus,
  PencilSimple,
  Trash,
  X,
  Eye,
} from "@phosphor-icons/react";
import type { Registration, Speaker, Partner } from "../../db/schema";
import AdminShell from "./AdminShell";
import ImageUploadField from "./ImageUploadField";

type Filter = "all" | "delegate" | "sponsor" | "partner";
type Tab = "registrations" | "speakers" | "partners" | "contacts";

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
  const [activeTab, setActiveTab] = useState<Tab>("registrations");

  // Registrations state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [regLoading, setRegLoading] = useState(false);
  const [registrationModal, setRegistrationModal] = useState<{ open: boolean; registration: Registration | null }>({ open: false, registration: null });

  // Speakers state
  const [speakersList, setSpeakersList] = useState<Speaker[]>([]);
  const [speakersLoading, setSpeakersLoading] = useState(false);
  const [speakerModal, setSpeakerModal] = useState<{ open: boolean; speaker: Partial<Speaker> | null }>({ open: false, speaker: null });

  // Partners state
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [partnerModal, setPartnerModal] = useState<{ open: boolean; partner: Partial<Partner> | null }>({ open: false, partner: null });

  // Contacts state
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactModal, setContactModal] = useState<{ open: boolean; contact: any | null }>({ open: false, contact: null });

  // Stats state
  const [counts, setCounts] = useState<Record<string, number>>({});

  const loadRegistrations = useCallback(async (checkAuth = false) => {
    setRegLoading(true);
    try {
      const query = filter === "all" ? "" : `?type=${filter}`;
      const response = await fetch(`/api/admin/registrations${query}`);
      if (response.status === 401) { setAuthenticated(false); return; }
      const data = await response.json();
      setRegistrations(data.registrations ?? []);
      setAuthenticated(true);
    } catch { if (checkAuth) setAuthenticated(false); }
    finally { setRegLoading(false); }
  }, [filter]);

  const loadSpeakers = useCallback(async () => {
    setSpeakersLoading(true);
    try {
      const res = await fetch("/api/admin/speakers");
      if (res.status === 401) { setAuthenticated(false); return; }
      const data = await res.json();
      setSpeakersList(data.speakers ?? []);
      setAuthenticated(true);
    } catch { /* noop */ }
    finally { setSpeakersLoading(false); }
  }, []);

  const loadPartners = useCallback(async () => {
    setPartnersLoading(true);
    try {
      const res = await fetch("/api/admin/partners");
      if (res.status === 401) { setAuthenticated(false); return; }
      const data = await res.json();
      setPartnersList(data.partners ?? []);
      setAuthenticated(true);
    } catch { /* noop */ }
    finally { setPartnersLoading(false); }
  }, []);

  const loadContacts = useCallback(async () => {
    setContactsLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.status === 401) { setAuthenticated(false); return; }
      const data = await res.json();
      setContactsList(Array.isArray(data) ? data : []);
      setAuthenticated(true);
    } catch { /* noop */ }
    finally { setContactsLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === "registrations") void loadRegistrations(true);
    else if (activeTab === "speakers") void loadSpeakers();
    else if (activeTab === "partners") void loadPartners();
    else if (activeTab === "contacts") void loadContacts();
  }, [activeTab, filter, loadRegistrations, loadSpeakers, loadPartners, loadContacts]);

  useEffect(() => {
    if (authenticated) {
      void (async () => {
        try {
          const res = await fetch("/api/admin/stats");
          if (res.ok) {
            setCounts(await res.json());
          }
        } catch {}
      })();
    }
  }, [authenticated]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) { setLoginError("Invalid password"); return; }
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

  function exportRegistrationsToCSV() {
    if (registrations.length === 0) return;
    const headers = ["Name", "Type", "Email", "Phone", "Organisation", "Role", "Status", "Notes", "Created At"];
    const csvContent = [
      headers.join(","),
      ...registrations.map(r => {
        return [
          `"${(r.fullName || '').replace(/"/g, '""')}"`,
          `"${r.type}"`,
          `"${r.email}"`,
          `"${(r.phone || '').replace(/"/g, '""')}"`,
          `"${(r.organization || '').replace(/"/g, '""')}"`,
          `"${(r.roleTitle || '').replace(/"/g, '""')}"`,
          `"${r.status}"`,
          `"${(r.notes || '').replace(/"/g, '""')}"`,
          `"${new Date(r.createdAt).toLocaleString()}"`
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `yebs_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- Speaker CRUD ---
  async function saveSpeaker(data: Record<string, unknown>) {
    const isEdit = !!data.id;
    const res = await fetch("/api/admin/speakers", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) { setSpeakerModal({ open: false, speaker: null }); void loadSpeakers(); }
  }

  async function deleteSpeaker(id: string) {
    if (!confirm("Delete this speaker?")) return;
    const res = await fetch(`/api/admin/speakers?id=${id}`, { method: "DELETE" });
    if (res.ok) void loadSpeakers();
  }

  // --- Partner CRUD ---
  async function savePartner(data: Record<string, unknown>) {
    const isEdit = !!data.id;
    const res = await fetch("/api/admin/partners", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) { setPartnerModal({ open: false, partner: null }); void loadPartners(); }
  }

  async function deletePartner(id: string) {
    if (!confirm("Delete this partner?")) return;
    const res = await fetch(`/api/admin/partners?id=${id}`, { method: "DELETE" });
    if (res.ok) void loadPartners();
  }

  // --- Auth states ---
  if (authenticated === null) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#111111]">
        <div className="absolute inset-0 bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center" aria-hidden />
        <div className="absolute inset-0 bg-black/65" aria-hidden />
        <p className="relative z-10 text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute inset-0 bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center" aria-hidden />
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
          <button type="submit" className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black">
            Sign in
          </button>
        </motion.form>
      </div>
    );
  }

  // --- Registrations tab content ---
  const stats = {
    total: registrations.length,
    delegates: registrations.filter((r) => r.type === "delegate").length,
    sponsors: registrations.filter((r) => r.type === "sponsor").length,
    partners: registrations.filter((r) => r.type === "partner").length,
    checkedIn: registrations.filter((r) => r.status === "checked_in").length,
  };

  return (
    <AdminShell activeTab={activeTab} onNavigate={(tab) => setActiveTab(tab as Tab)} onLogout={handleLogout} counts={counts}>
      {activeTab === "registrations" && (
        <div className="space-y-8">
          <div>
            <p className="text-sm text-zinc-600">
              Good day — here is the current registration activity for{" "}
              <span className="font-semibold text-zinc-900">YEBS 2026</span>.
            </p>
          </div>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-wrap lg:items-stretch">
            <StatCard label="Total registrations" value={stats.total} icon={UsersThree} highlight />
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
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-wrap gap-2">
                  {(["all", "delegate", "sponsor", "partner"] as Filter[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                        filter === item ? "bg-zinc-900 text-white shadow-sm" : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={exportRegistrationsToCSV}
                  disabled={registrations.length === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-50"
                >
                  Export CSV
                </button>
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
                  {regLoading ? (
                    <tr><td colSpan={6} className="px-4 py-16 text-center text-zinc-500">Loading registrations...</td></tr>
                  ) : registrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center">
                        <div className="mx-auto max-w-sm">
                          <p className="text-sm font-medium text-zinc-900">No registrations yet</p>
                          <p className="mt-1 text-sm text-zinc-500">Delegate, sponsor, and partner sign-ups will appear here once submitted.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    registrations.map((row) => (
                      <tr key={row.id} className="group transition-colors hover:bg-zinc-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-zinc-900">{row.fullName}</p>
                          {row.roleTitle && <p className="mt-0.5 text-xs text-zinc-400">{row.roleTitle}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${typeStyles[row.type]}`}>
                            {row.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-zinc-600">{row.email}</td>
                        <td className="px-4 py-3 text-zinc-600">{row.organization ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[row.status]}`}>
                            {row.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-col items-end justify-end gap-2 sm:flex-row">
                            {row.status !== "approved" && row.status !== "checked_in" && (
                              <button type="button" onClick={() => updateStatus(row.id, "approved")} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50">Approve</button>
                            )}
                            {row.status !== "checked_in" && (
                              <button type="button" onClick={() => updateStatus(row.id, "checked_in")} className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black">Check in</button>
                            )}
                            <button type="button" onClick={() => setRegistrationModal({ open: true, registration: row })} className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900" aria-label="View">
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {registrationModal.open && (
            <RegistrationDetailsModal
              registration={registrationModal.registration}
              onClose={() => setRegistrationModal({ open: false, registration: null })}
            />
          )}
        </div>
      )}

      {activeTab === "speakers" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Speakers</h2>
              <p className="text-sm text-zinc-500">Add, edit, or remove speakers from the YEBS page.</p>
            </div>
            <button
              type="button"
              onClick={() => setSpeakerModal({ open: true, speaker: null })}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              <Plus size={16} weight="bold" /> Add speaker
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Topics</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Order</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {speakersLoading ? (
                  <tr><td colSpan={6} className="px-4 py-16 text-center text-zinc-500">Loading speakers...</td></tr>
                ) : speakersList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <p className="text-sm font-medium text-zinc-900">No speakers yet</p>
                      <p className="mt-1 text-sm text-zinc-500">Add your first speaker using the button above.</p>
                    </td>
                  </tr>
                ) : (
                  speakersList.map((s) => (
                    <tr key={s.id} className="group transition-colors hover:bg-zinc-50">
                      <td className="px-4 py-3">
                        <div className="h-10 w-10 overflow-hidden rounded-lg bg-zinc-200">
                          {s.imageUrl && <img src={s.imageUrl} alt={s.name} className="h-full w-full object-cover" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-zinc-900">{s.name}</td>
                      <td className="px-4 py-3 text-zinc-600">{s.title}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(s.topics ?? []).map((t) => (
                            <span key={t} className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-500">{s.sortOrder}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button type="button" onClick={() => setSpeakerModal({ open: true, speaker: s })} className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900" aria-label="Edit">
                            <PencilSimple size={14} />
                          </button>
                          <button type="button" onClick={() => deleteSpeaker(s.id)} className="rounded-lg border border-red-200 bg-white p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700" aria-label="Delete">
                            <Trash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {speakerModal.open && (
            <SpeakerFormModal
              speaker={speakerModal.speaker}
              onSave={saveSpeaker}
              onClose={() => setSpeakerModal({ open: false, speaker: null })}
            />
          )}
        </div>
      )}

      {activeTab === "partners" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Partners</h2>
              <p className="text-sm text-zinc-500">Add, edit, or remove partners from the YEBS page.</p>
            </div>
            <button
              type="button"
              onClick={() => setPartnerModal({ open: true, partner: null })}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              <Plus size={16} weight="bold" /> Add partner
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Logo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">URL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Order</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {partnersLoading ? (
                  <tr><td colSpan={5} className="px-4 py-16 text-center text-zinc-500">Loading partners...</td></tr>
                ) : partnersList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <p className="text-sm font-medium text-zinc-900">No partners yet</p>
                      <p className="mt-1 text-sm text-zinc-500">Add your first partner using the button above.</p>
                    </td>
                  </tr>
                ) : (
                  partnersList.map((p) => (
                    <tr key={p.id} className="group transition-colors hover:bg-zinc-50">
                      <td className="px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-zinc-200 p-1">
                          {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="h-full w-full object-contain" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-zinc-900">{p.name}</td>
                      <td className="px-4 py-3 text-zinc-500">
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">{p.url}</a>
                      </td>
                      <td className="px-4 py-3 text-zinc-500">{p.sortOrder}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button type="button" onClick={() => setPartnerModal({ open: true, partner: p })} className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900" aria-label="Edit">
                            <PencilSimple size={14} />
                          </button>
                          <button type="button" onClick={() => deletePartner(p.id)} className="rounded-lg border border-red-200 bg-white p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700" aria-label="Delete">
                            <Trash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {partnerModal.open && (
            <PartnerFormModal
              partner={partnerModal.partner}
              onSave={savePartner}
              onClose={() => setPartnerModal({ open: false, partner: null })}
            />
          )}
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Contacts</h2>
              <p className="text-sm text-zinc-500">View messages submitted from the contact form.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Organisation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Help Topic</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">Message</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {contactsLoading ? (
                  <tr><td colSpan={6} className="px-4 py-16 text-center text-zinc-500">Loading contacts...</td></tr>
                ) : contactsList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <p className="text-sm font-medium text-zinc-900">No contacts yet</p>
                      <p className="mt-1 text-sm text-zinc-500">Messages sent via the contact form will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  contactsList.map((c) => (
                    <tr key={c.id} className="group transition-colors hover:bg-zinc-50">
                      <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium text-zinc-900">{c.name}</td>
                      <td className="px-4 py-3 text-zinc-600">{c.organization ?? "—"}</td>
                      <td className="px-4 py-3 text-zinc-600">{c.helpTopic ?? "—"}</td>
                      <td className="px-4 py-3 text-zinc-500 max-w-xs truncate" title={c.message}>{c.message}</td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" onClick={() => setContactModal({ open: true, contact: c })} className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900" aria-label="View">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {contactModal.open && (
            <ContactDetailsModal
              contact={contactModal.contact}
              onClose={() => setContactModal({ open: false, contact: null })}
            />
          )}
        </div>
      )}
    </AdminShell>
  );
}

// ====================== MODALS & SHARED COMPONENTS ======================

function SpeakerFormModal({
  speaker,
  onSave,
  onClose,
}: {
  speaker: Partial<Speaker> | null;
  onSave: (data: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const isEdit = !!speaker?.id;
  const [name, setName] = useState(speaker?.name ?? "");
  const [title, setTitle] = useState(speaker?.title ?? "");
  const [bio, setBio] = useState(speaker?.bio ?? "");
  const [imageUrl, setImageUrl] = useState(speaker?.imageUrl ?? "");
  const [topics, setTopics] = useState((speaker?.topics ?? []).join(", "));
  const [sortOrder, setSortOrder] = useState(String(speaker?.sortOrder ?? 0));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Record<string, unknown> = {
      name,
      title,
      bio,
      imageUrl,
      topics: topics.split(",").map((t) => t.trim()).filter(Boolean),
      sortOrder: Number(sortOrder) || 0,
    };
    if (isEdit) data.id = speaker!.id;
    onSave(data);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h3 className="text-base font-semibold text-zinc-900">{isEdit ? "Edit speaker" : "Add speaker"}</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <ModalField label="Name" value={name} onChange={setName} required />
          <ModalField label="Title / Role" value={title} onChange={setTitle} required />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} required className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-900" />
          </div>
          <ImageUploadField label="Image" value={imageUrl} onChange={setImageUrl} cover />
          <ModalField label="Topics (comma-separated)" value={topics} onChange={setTopics} placeholder="Policy, Workforce, Energy" />
          <ModalField label="Sort order" value={sortOrder} onChange={setSortOrder} type="number" />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">{isEdit ? "Save changes" : "Add speaker"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function PartnerFormModal({
  partner,
  onSave,
  onClose,
}: {
  partner: Partial<Partner> | null;
  onSave: (data: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const isEdit = !!partner?.id;
  const [name, setName] = useState(partner?.name ?? "");
  const [url, setUrl] = useState(partner?.url ?? "");
  const [imageUrl, setImageUrl] = useState(partner?.imageUrl ?? "");
  const [className, setClassName] = useState(partner?.className ?? "");
  const [sortOrder, setSortOrder] = useState(String(partner?.sortOrder ?? 0));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Record<string, unknown> = {
      name,
      url,
      imageUrl: imageUrl || null,
      className: className || null,
      sortOrder: Number(sortOrder) || 0,
    };
    if (isEdit) data.id = partner!.id;
    onSave(data);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h3 className="text-base font-semibold text-zinc-900">{isEdit ? "Edit partner" : "Add partner"}</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <ModalField label="Name" value={name} onChange={setName} required />
          <ModalField label="Website URL" value={url} onChange={setUrl} required placeholder="https://example.com" />
          <ImageUploadField label="Logo" value={imageUrl} onChange={setImageUrl} />
          <ModalField label="CSS class (optional)" value={className} onChange={setClassName} placeholder="font-bold text-blue-900" />
          <ModalField label="Sort order" value={sortOrder} onChange={setSortOrder} type="number" />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">{isEdit ? "Save changes" : "Add partner"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ContactDetailsModal({
  contact,
  onClose,
}: {
  contact: any;
  onClose: () => void;
}) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h3 className="text-base font-semibold text-zinc-900">Contact Details</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-zinc-500">Name</p>
            <p className="text-sm text-zinc-900">{contact.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Email</p>
              <p className="text-sm text-zinc-900">{contact.email || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Phone</p>
              <p className="text-sm text-zinc-900">{contact.phone || "—"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Organisation</p>
              <p className="text-sm text-zinc-900">{contact.organization || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Help Topic</p>
              <p className="text-sm text-zinc-900">{contact.helpTopic || "—"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Message</p>
            <p className="text-sm text-zinc-900 mt-1 rounded-lg bg-zinc-50 p-3 whitespace-pre-wrap">{contact.message}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Date Submitted</p>
            <p className="text-sm text-zinc-900">{new Date(contact.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RegistrationDetailsModal({
  registration,
  onClose,
}: {
  registration: Registration | null;
  onClose: () => void;
}) {
  if (!registration) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h3 className="text-base font-semibold text-zinc-900 capitalize">{registration.type} Registration Details</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Name</p>
              <p className="text-sm text-zinc-900">{registration.fullName}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Status</p>
              <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[registration.status]}`}>
                {registration.status.replace("_", " ")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Email</p>
              <p className="text-sm text-zinc-900">{registration.email || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Phone</p>
              <p className="text-sm text-zinc-900">{registration.phone || "—"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Organisation</p>
              <p className="text-sm text-zinc-900">{registration.organization || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Role / Title</p>
              <p className="text-sm text-zinc-900">{registration.roleTitle || "—"}</p>
            </div>
          </div>
          {registration.notes && (
            <div>
              <p className="text-xs font-medium text-zinc-500">Notes / Comments</p>
              <p className="text-sm text-zinc-900 mt-1 rounded-lg bg-zinc-50 p-3 whitespace-pre-wrap">{registration.notes}</p>
            </div>
          )}

          {/* Metadata Section */}
          {registration.metadata && Object.keys(registration.metadata).length > 0 && (
            <div className="pt-4 border-t border-zinc-100">
              <h4 className="text-sm font-semibold text-zinc-900 mb-3">Additional Details</h4>
              <div className="space-y-4">
                {Object.entries(registration.metadata).map(([key, value]) => {
                  // Format key (e.g. skillsBuilding -> Skills Building)
                  const formattedKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  
                  let displayValue = "—";
                  if (Array.isArray(value)) {
                    displayValue = value.length > 0 ? value.join(", ") : "—";
                  } else if (value) {
                    displayValue = String(value);
                  }

                  return (
                    <div key={key}>
                      <p className="text-xs font-medium text-zinc-500">{formattedKey}</p>
                      <p className="text-sm text-zinc-900 mt-1 rounded-lg bg-zinc-50 p-3 whitespace-pre-wrap">{displayValue}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
            <div>
              <p className="text-xs font-medium text-zinc-500">Date Registered</p>
              <p className="text-sm text-zinc-900">{new Date(registration.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Check-in Time</p>
              <p className="text-sm text-zinc-900">{registration.checkedInAt ? new Date(registration.checkedInAt).toLocaleString() : "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ModalField({
  label, value, onChange, required, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-900" />
    </div>
  );
}

function StatCard({
  label, value, icon: Icon, highlight = false,
}: {
  label: string; value: number; icon: React.ElementType; highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col justify-between rounded-xl border p-4 sm:min-w-[160px] sm:p-5 lg:flex-1 ${highlight ? "border-zinc-900 bg-zinc-900 text-white shadow-sm" : "border-zinc-200 bg-white"}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs font-medium ${highlight ? "text-white/70" : "text-zinc-500"}`}>{label}</span>
        <Icon className={`h-4 w-4 shrink-0 ${highlight ? "text-white/80" : "text-zinc-400"}`} weight="regular" />
      </div>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${highlight ? "text-white" : "text-zinc-900"}`}>{value}</p>
    </div>
  );
}
