const express = require('express');
const router = express.Router();
const { loadGameState, saveGameState } = require('../controllers/gameController');

router.get('/load/:userId', loadGameState);
router.post('/save', saveGameState);

module.exports = router;
