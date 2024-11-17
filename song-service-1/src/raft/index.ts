import { Application } from "express";

// Router
import router from "./router";

// controllers
import { handleVoteRequest } from "./controllers";

function raft(app: Application) {
  app.use("/raft", router);
}

export default raft;
