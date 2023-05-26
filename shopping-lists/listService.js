import { sql } from "./database.js";

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const deactivateById = async (listId) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${listId}`;
};

export { findAllActiveLists, create, deactivateById };
