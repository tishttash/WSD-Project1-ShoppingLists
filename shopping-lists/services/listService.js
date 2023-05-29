import { sql } from "../database/database.js";

const countLists = async () => {
  return await sql `SELECT COUNT(*) FROM shopping_lists`;
};

const countItems = async () => {
  return await sql`SELECT COUNT(*) FROM shopping_list_items`;
};

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const deactivateById = async (listId) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${listId}`;
};

const findListbyId = async (listId) => {
    return await sql`SELECT * FROM shopping_lists WHERE id = ${listId}`;
};

const findAllActiveItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${listId} AND collected = false 
    ORDER BY name ASC `;
};

const createItem = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

const collectItemById = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`;
};

const findAllCollectedItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${listId} AND collected = true 
    ORDER BY name ASC`;
}

export { 
  countLists,
  countItems,
  findAllActiveLists, 
  create, 
  deactivateById, 
  findListbyId, 
  findAllActiveItems,
  createItem,
  collectItemById,
  findAllCollectedItems,
};
