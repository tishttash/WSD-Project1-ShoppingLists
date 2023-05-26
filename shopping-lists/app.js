import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";
// import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
