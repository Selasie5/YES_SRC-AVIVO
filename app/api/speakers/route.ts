import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { speakers } from "../../../db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const db = getDb();
    const allSpeakers = await db.select().from(speakers).orderBy(asc(speakers.sortOrder));
    return NextResponse.json({ speakers: allSpeakers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch speakers" }, { status: 500 });
  }
}
