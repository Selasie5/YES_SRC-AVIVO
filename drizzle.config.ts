import { existsSync } from "fs";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js uses .env.local; drizzle-kit only auto-loads .env
if (existsSync(".env.local")) {
  config({ path: ".env.local" });
}
config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string."
  );
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
