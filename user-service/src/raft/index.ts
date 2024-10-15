import express from 'express';
import raftRouter from './raftRouter';

const router = express.Router();

// Define base paths for routes
router.use('/raft', raftRouter);

module.exports = router;
