import express from 'express';

import { requireAuth } from '../middlewares/requireAuth';
import checkIsManager from '../middlewares/checkIsManager';

import { getAllAlbums, createAlbum, addSongToAlbum, deleteSongFromAlbum, deleteAlbum } from '../controllers/albumController';

const router = express.Router();
router.use(requireAuth);

router.get('/all', getAllAlbums);
router.post('/create', checkIsManager, createAlbum);
router.post('/add/:album_id', checkIsManager, addSongToAlbum);
router.post('/deleteSong/:album_id', checkIsManager, deleteSongFromAlbum);
router.delete('/delete/:album_id', checkIsManager, deleteAlbum);

export default router;