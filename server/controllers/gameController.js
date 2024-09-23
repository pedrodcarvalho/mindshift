const GameState = require('../models/GameState');

const loadGameState = async (req, res) => {
  const { userId } = req.params;

  try {
    const savedGameState = await GameState.findOne({ userId });
    if (!savedGameState) {
      return res.status(200).json({ gameState: {} });
    }
    res.status(200).json(savedGameState);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load game state' });
  }
};

const saveGameState = async (req, res) => {
  const { userId, gameState } = req.body;

  try {
    const savedGameState = await GameState.findOneAndUpdate({ userId }, { userId, gameState }, { upsert: true, new: true });

    res.status(200).json(savedGameState);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save game state' });
  }
};

module.exports = {
  loadGameState,
  saveGameState,
};
