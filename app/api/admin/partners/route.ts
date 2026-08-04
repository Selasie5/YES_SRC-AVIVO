import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { partners } from "../../../../db/schema";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = getDb();
    const rows = await db.select().from(partners).orderBy(asc(partners.sortOrder));
    return NextResponse.json({ partners: rows });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const db = getDb();
    const [inserted] = await db.insert(partners).values(body).returning();
    return NextResponse.json({ partner: inserted });
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
    const [updated] = await db.update(partners).set(data).where(eq(partners.id, id)).returning();
    return NextResponse.json({ partner: updated });
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
    await db.delete(partners).where(eq(partners.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
