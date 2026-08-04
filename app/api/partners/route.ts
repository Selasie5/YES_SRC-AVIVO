import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { partners } from "../../../db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const db = getDb();
    const allPartners = await db.select().from(partners).orderBy(asc(partners.sortOrder));
    return NextResponse.json({ partners: allPartners });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}
