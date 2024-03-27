import express from 'express';
import { getAllSongs, getMetadataFromSongId, getSongFile } from '../controllers/songController';

const router = express.Router();

router.get('/all', getAllSongs);
router.get('/:song_id', getMetadataFromSongId);
router.get('/:file_id', getSongFile);

export default router;