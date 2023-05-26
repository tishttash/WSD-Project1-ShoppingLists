import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
// import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewTasks = async (request) => {
    const data = {
      lists: await listService.findAllActiveLists(),
    };
  
    return new Response(await renderFile("lists.eta", data), responseDetails);
  };

export { addTask, viewTask, viewTasks, completeTask };
