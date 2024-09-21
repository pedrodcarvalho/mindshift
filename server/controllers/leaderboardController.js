const Leaderboard = require('../models/leaderboardModel');

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findOne();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeaderboard = async (req, res) => {
  try {
    const { score, level } = req.body;
    const leaderboard = await Leaderboard.findOneAndUpdate({}, { score, level }, { new: true });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard, updateLeaderboard };
