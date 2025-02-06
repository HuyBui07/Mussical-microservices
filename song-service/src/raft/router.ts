import express from "express";

// controllers
import { handleHeartbeatFromLeader, handleVoteRequest, handleAppendEntry, handleCommitEntry } from "./controllers";

const router = express.Router();

router.post("/heartbeat_from_leader", handleHeartbeatFromLeader);
router.post("/vote", handleVoteRequest);

// Log mechanism
router.post("/appendEntry", handleAppendEntry);
router.post("/commitEntry", handleCommitEntry);

export default router;