const express = require('express');
const { getLeaderboard, updateLeaderboard } = require('../controllers/leaderboardController');

const router = express.Router();

router.get('/', getLeaderboard);
router.put('/', updateLeaderboard);

module.exports = router;
