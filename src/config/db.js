import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// create connection db
export const sql = neon(process.env.DATABASE_URL);