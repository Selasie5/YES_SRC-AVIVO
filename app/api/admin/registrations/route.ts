import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { registrations } from "../../../../db/schema";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    const db = getDb();
    const rows = type
      ? await db.select().from(registrations).where(eq(registrations.type, type as "delegate" | "sponsor" | "partner"))
      : await db.select().from(registrations);

    return NextResponse.json({ registrations: rows });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body as { id?: string; status?: "pending" | "approved" | "checked_in" };

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const db = getDb();
    const checkedInAt = status === "checked_in" ? new Date() : null;

    const [updated] = await db
      .update(registrations)
      .set({ status, checkedInAt })
      .where(eq(registrations.id, id))
      .returning();

    return NextResponse.json({ registration: updated });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
