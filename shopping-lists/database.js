import { postgres } from "./deps.js";

// TODO: CHANGE DATABASE NAME!!!
let sql;
if (Deno.env.get("DATABASE_URL17")) {
  sql = postgres(Deno.env.get("DATABASE_URL17"));
} else {
  sql = postgres({});
}

export { sql };
