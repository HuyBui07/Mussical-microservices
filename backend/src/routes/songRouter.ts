import express from "express";
import {
  getAllSongs,
  createSong,
  getMetadataFromSongId,
  deleteSong,
  increaseListenCount,
  updateSong,
} from "../controllers/songController";

//middleware
import { requireAuth } from "../middlewares/requireAuth";
import checkIsManager from "../middlewares/checkIsManager";
import { multerSongUploader } from "../cloudinary";
import assignPagination from "../middlewares/pagination";
const router = express.Router();
//For managers
//Exclude use requierAuth on createSong. checkIsManager is enough
router.post("/", checkIsManager, multerSongUploader, createSong);
router.put("/:song_id", checkIsManager, updateSong);
router.delete("/:song_id", checkIsManager, deleteSong);
//For normal users
router.use(requireAuth);
router.get("/all", assignPagination, getAllSongs);
router.get("/:song_id", getMetadataFromSongId);
router.get("/:song_id/play", increaseListenCount);

export default router;
