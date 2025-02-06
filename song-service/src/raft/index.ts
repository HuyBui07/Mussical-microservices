import { Application } from "express";

// Router
import router from "./router";
import startElection from "./election";

function raft(app: Application) {
  app.use("/raft", router);
}

export default raft;
