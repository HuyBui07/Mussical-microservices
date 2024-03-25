import express from 'express';
import { getSong } from '../controllers/songController';

const router = express.Router();

router.get('/', getSong);

export default router;