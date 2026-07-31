import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const { clearAdminSession } = await import("../../../../lib/admin-auth");
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
