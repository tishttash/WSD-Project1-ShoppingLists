import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "./listService.js";
import * as requestUtils from "./requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewMainPage = async (request) => {
  const listC = await listService.countLists();
  const varlistCount = listC[0].count; 
  const itemC = await listService.countItems();
  const varitemCount = itemC[0].count; 
  
  const data = {
    listCount: varlistCount,
    itemCount: varitemCount,
  };
  // console.log(data.listCount);
  // console.log(data.itemCount);
  return new Response(await renderFile("main.eta", data), responseDetails);
};

const viewLists = async (request) => {
    const data = {
      lists: await listService.findAllActiveLists(),
    };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const listId = urlParts[2];

  await listService.deactivateById(listId);

  return await requestUtils.redirectTo("/lists");
};

const viewIndivList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const currentList = await listService.findListbyId(urlParts[2]);
  // console.log(currentList);
  // console.log(currentList[0]);
  // console.log(currentList[0].id);
  // console.log(items);

  const data = {
    currentListName: currentList[0].name,
    currentListId: currentList[0].id,
    itemsActive: await listService.findAllActiveItems(),
    itemsCollected: await listService.findAllCollectedItems(),
  };
  return new Response(await renderFile("indivlist.eta", data), responseDetails);
};

const addItemtoList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const listId = urlParts[2];

  const formData = await request.formData();
  const name = formData.get("name");

  await listService.createItem(name);

  return requestUtils.redirectTo(`/lists/${listId}`);
}

const collectItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const listId = urlParts[2];
  const itemId = urlParts[4];

  await listService.collectItemById(itemId);

  return requestUtils.redirectTo(`/lists/${listId}`);
}

export { 
  viewMainPage,
  viewLists, 
  addList, 
  deactivateList, 
  viewIndivList, 
  addItemtoList, 
  collectItem 
};
