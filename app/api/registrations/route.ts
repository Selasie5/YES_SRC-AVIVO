import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { registrations } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      fullName,
      email,
      phone,
      organization,
      roleTitle,
      notes,
      metadata,
    } = body as {
      type?: "delegate" | "sponsor" | "partner";
      fullName?: string;
      email?: string;
      phone?: string;
      organization?: string;
      roleTitle?: string;
      notes?: string;
      metadata?: Record<string, string>;
    };

    if (!type || !fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["delegate", "sponsor", "partner"].includes(type)) {
      return NextResponse.json({ error: "Invalid registration type" }, { status: 400 });
    }

    const db = getDb();
    const [created] = await db
      .insert(registrations)
      .values({
        type,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        organization: organization?.trim() || null,
        roleTitle: roleTitle?.trim() || null,
        notes: notes?.trim() || null,
        metadata: metadata ?? null,
      })
      .returning();

    return NextResponse.json({ registration: created }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
