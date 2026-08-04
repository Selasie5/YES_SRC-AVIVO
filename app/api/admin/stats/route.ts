import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { registrations, speakers, partners, contacts } from "@/db/schema";
import { count } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    
    const [regCount, speakerCount, partnerCount, contactCount] = await Promise.all([
      db.select({ value: count() }).from(registrations),
      db.select({ value: count() }).from(speakers),
      db.select({ value: count() }).from(partners),
      db.select({ value: count() }).from(contacts),
    ]);

    return NextResponse.json({
      registrations: regCount[0].value,
      speakers: speakerCount[0].value,
      partners: partnerCount[0].value,
      contacts: contactCount[0].value,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
