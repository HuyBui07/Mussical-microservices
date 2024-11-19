import express from "express";

// controllers
import { handleHeartbeatFromLeader, handleVoteRequest } from "./controllers";

const router = express.Router();

router.post("/heartbeat_from_leader", handleHeartbeatFromLeader);
router.post("/vote", handleVoteRequest);


export default router;