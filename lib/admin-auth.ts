import { cookies } from "next/headers";

const COOKIE_NAME = "afrovivo_admin_session";

export function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, getAdminSessionSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === getAdminSessionSecret();
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
