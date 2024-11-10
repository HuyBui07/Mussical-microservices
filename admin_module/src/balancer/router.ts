import express from "express";

import { forwardWriteRequestToLeader, forwardReadRequestToNodes } from "./controllers";

const router = express.Router();

router.post("/create", forwardWriteRequestToLeader);


router.get("/stats", forwardReadRequestToNodes);
router.get("/stats/tags", forwardReadRequestToNodes);
router.get("/stats/songs", forwardReadRequestToNodes);

router.put("/:song_id", forwardWriteRequestToLeader);

router.delete("/:song_id", forwardWriteRequestToLeader);

export default router;
