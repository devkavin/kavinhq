import { readFile } from "node:fs/promises";
import { Client } from "pg";

const url = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;

if (!url) {
  throw new Error("Set POSTGRES_URL_NON_POOLING or POSTGRES_URL before running this script.");
}

const files = [
  "supabase/migrations/20260603180000_initial_schema.sql",
  "supabase/seed.sql"
];

const client = new Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false }
});

await client.connect();

try {
  for (const file of files) {
    const sql = await readFile(file, "utf8");
    console.log(`Running ${file}`);
    await client.query(sql);
  }
  console.log("Supabase schema and seed completed.");
} finally {
  await client.end();
}
