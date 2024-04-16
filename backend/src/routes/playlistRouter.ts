import express from "express";

import {
  createPlaylist,
  addSongToPlaylist,
  getAllPlaylists,
  removeSongFromPlaylist,
} from "../controllers/playlistController";

import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.post("/create", createPlaylist);
router.post("/add/:playlist_id", addSongToPlaylist);
router.post("/remove/:playlist_id", removeSongFromPlaylist);
router.get("/all", getAllPlaylists);

export default router;
