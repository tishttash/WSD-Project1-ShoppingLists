import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";
// import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
// import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewMainPage(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if ((url.pathname).includes("/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.includes("/lists/") && request.method === "GET") {
    return await listController.viewIndivList(request);
  } else if (url.pathname.includes("/collect") && request.method === "POST") {
    return await listController.collectItem(request);
  } else if (url.pathname.includes("/items") && request.method === "POST") {
    return await listController.addItemtoList(request);
  } 
  
  else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
