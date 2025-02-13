import express from "express";
import {
  getAllSongs,
  createSong,
  getMetadataFromSongId,
  deleteSong,
  increaseListenCount,
  updateSong,
  getThisMonthStats,
  getTags,
  getRecentSongs,
  getForYouSongs,
} from "./songController";

//middleware
import { requireAuth } from "./middlewares/requireAuth";
import checkIsManager from "./middlewares/checkIsManager";
import { multerSongUploader } from "./cloudinary";
import { assignPagination } from "./middlewares/pagination";
import { assignPaginationNormalRequest } from "./middlewares/pagination";
const router = express.Router();
//For managers
//Exclude use requierAuth on createSong. checkIsManager is enough
router.post("/create", checkIsManager, multerSongUploader, createSong);
router.get("/stats", checkIsManager, getThisMonthStats);
router.get("/stats/tags", checkIsManager, getTags);
router.get(
  "/stats/songs",
  checkIsManager,
  assignPaginationNormalRequest,
  getAllSongs
);
router.put("/:song_id", checkIsManager, updateSong);
router.delete("/delete", checkIsManager, deleteSong);

//For normal users
// test
// router.use(requireAuth);
router.get("/all", assignPagination, getAllSongs);
router.get("/recent", assignPagination, getRecentSongs);
router.get("/for-you", assignPagination, getForYouSongs);
router.get("/tags", getTags);
router.get("/:song_id", getMetadataFromSongId);
router.get("/:song_id/play", increaseListenCount);

export default router;
