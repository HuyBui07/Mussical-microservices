import express from "express";

// controllers
import { handleHeartbeatFromLeader, handleVoteRequest, handleAppendEntry } from "./controllers";

const router = express.Router();

router.post("/heartbeat_from_leader", handleHeartbeatFromLeader);
router.post("/vote", handleVoteRequest);

router.post("/appendEntry", handleAppendEntry);


export default router;