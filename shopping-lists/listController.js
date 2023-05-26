import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "./listService.js";
import * as requestUtils from "./requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
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

export { viewLists, addList, deactivateList };
