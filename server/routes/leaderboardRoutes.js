const express = require('express');
const { getLeaderboard, updateLeaderboard } = require('../controllers/leaderboardController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getLeaderboard);
router.put('/', protect, updateLeaderboard);

module.exports = router;
