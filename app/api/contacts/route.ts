import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, phone, organization, helpTopic, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.insert(contacts).values({
      name,
      email,
      phone,
      organization,
      helpTopic,
      message,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
