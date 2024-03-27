import express from 'express';

import { requireAuth } from '../middlewares/requireAuth';

import { getAllAlbums } from '../controllers/albumController';

const router = express.Router();
router.use(requireAuth);

router.get('/all', getAllAlbums);

export default router;