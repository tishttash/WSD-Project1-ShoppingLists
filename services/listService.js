import { sql } from "../database/database.js";

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

export { findAllActiveLists };
