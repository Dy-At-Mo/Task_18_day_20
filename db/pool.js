import { Pool } from "pg";
import "dotenv/config";


console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD loaded:", Boolean(process.env.PGPASSWORD));


// postgres://postgres:password@
export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});


pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
 