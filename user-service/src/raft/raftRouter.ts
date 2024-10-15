import express from "express";
import { requestVote, appendEntries } from "./raftController";

const router = express.Router();

let heartbeatTimer: NodeJS.Timeout | null = null;

const startHeartbeatTimer = () => {
  if (heartbeatTimer) {
    clearTimeout(heartbeatTimer);
  }
  heartbeatTimer = setTimeout(() => {
    console.log("No heartbeat received for 10 seconds. Taking action.");
    // TODO; Implement logic to handle no heartbeat received
  }, 10000); // 10 seconds
};

router.post("/heartbeat", (req, res) => {
  console.log("Received heartbeat from leader");
  startHeartbeatTimer();
});

router.post("/requestVote", requestVote);

router.post("/appendEntries", appendEntries);

export default router;
