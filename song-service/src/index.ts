import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import pidusage from "pidusage";
import { LogEntry } from "./models/logModel";
import { state } from "./raft/state";

//routers
import songRouter from "./songRouter";

//heartbeat
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

// // Middleware to log every request
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   console.log("Headers:", req.headers);
//   if (req.method !== "GET") {
//     console.log("Body:", req.body);
//   }
//   next();
// });

// response time middleware
app.use(
  "/api",
  (req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
      const diff = process.hrtime(start);
      const responseTimeMs = diff[0] * 1e3 + diff[1] / 1e6;

      pidusage(process.pid, async (err, stats) => {
        if (err) {
          console.error("Error: ", err);
        }

        try {
          const response = await fetch("http://host.docker.internal:5000/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input: [stats.cpu, stats.memory / 1024 / 1024, responseTimeMs],
            }),
          });

          if (!response.ok) {
            console.error(
              "Failed to send data to analyze:",
              response.statusText
            );
          }
        } catch (fetchError) {
          console.error("Fetch error:", fetchError);
        }

        console.log(
          "Stats: ",
          stats.cpu,
          stats.memory / 1024 / 1024,
          responseTimeMs
        );
      });
    });

    next();
  },
  songRouter
);

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

// Get current leader state
const getLeaderState = async () => {
  const response = await fetch(
    (process.env.BALANCER_URL as string) + "/current-leader"
  );

  const data = await response.text();

  console.log("Leader state: ", data);

  state.leaderId = data;
  state.isLeader = data === state.id;
};

getLeaderState();

// Send a heartbeat every 5 seconds if the node is the leader
startHeartbeatProcess();

// API for getting server stats
app.get("/server-stats", (req, res) => {
  pidusage(process.pid, (err, stats) => {
    if (err) {
      console.error("Error: ", err);
    }

    res.status(200).json({
      cpu: stats.cpu,
      memory: stats.memory / 1024 / 1024,
    });
  });
});

// Get latest log index
const getLatestLogIndex = async () => {
  const latestLogIndex = await LogEntry.findOne().sort({ _id: -1 });
  state.latestLogIndex = latestLogIndex ? latestLogIndex.index : 0;
  console.log("Latest log index: ", state.latestLogIndex);
};

getLatestLogIndex();
