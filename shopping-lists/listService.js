import { sql } from "./database.js";

const countLists = async () => {
  return await sql`SELECT COUNT(*) FROM shopping_lists`;
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

const findAllActiveItems = async () => {
  return await sql`SELECT * FROM shopping_list_items WHERE collected=false ORDER BY name ASC `;
};

const createItem = async (name) => {
  await sql`INSERT INTO shopping_list_items (name) VALUES (${name})`;
};

const collectItemById = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`;
};

const findAllCollectedItems = async () => {
  return await sql`SELECT * FROM shopping_list_items WHERE collected=true ORDER BY name ASC`;
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
