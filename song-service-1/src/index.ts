import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//routers
import songRouter from "./songRouter";

//heartbeat
import sendHeartbeat from "./sendHeartbeat";
import { state } from "./raft/state";
import { startHeartbeatProcess } from "./raft/heartbeat";

//raft
import raft from "./raft";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    exposedHeaders: "X-Total-Count",
  })
);

app.use("/api", songRouter);

// raft
raft(app);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Example song service node listening at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err: any) => {
    console.log(err);
  });

// Send a heartbeat every 5 seconds if the node is the leader
startHeartbeatProcess();
