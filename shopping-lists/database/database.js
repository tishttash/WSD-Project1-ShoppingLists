import { postgres } from "../deps.js";

// TODO: CHANGE DATABASE NAME!!!
let sql;
if (Deno.env.get("DATABASE_URL20")) {
  sql = postgres(Deno.env.get("DATABASE_URL20"));
} else {
  sql = postgres({});
}

export { sql };
