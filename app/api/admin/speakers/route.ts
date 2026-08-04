import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { speakers } from "../../../../db/schema";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = getDb();
    const rows = await db.select().from(speakers).orderBy(asc(speakers.sortOrder));
    return NextResponse.json({ speakers: rows });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const db = getDb();
    const [inserted] = await db.insert(speakers).values(body).returning();
    return NextResponse.json({ speaker: inserted });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const db = getDb();
    const [updated] = await db.update(speakers).set(data).where(eq(speakers.id, id)).returning();
    return NextResponse.json({ speaker: updated });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const db = getDb();
    await db.delete(speakers).where(eq(speakers.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
