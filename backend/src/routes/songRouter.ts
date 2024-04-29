import express from "express";
import {
  getAllSongs,
  createSong,
  getMetadataFromSongId,
  deleteSong,
} from "../controllers/songController";

//middleware
import { requireAuth } from "../middlewares/requireAuth";
import checkIsManager from "../middlewares/checkIsManager";

const router = express.Router();
router.use(requireAuth);

router.get("/all", getAllSongs);
router.get("/delete/:song_id",checkIsManager, deleteSong);
router.get("/:song_id", getMetadataFromSongId);
router.post("/create", checkIsManager, createSong);

export default router;
