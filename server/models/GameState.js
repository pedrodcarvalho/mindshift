const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameStateSchema = new Schema({
  userId: { type: String, required: true },
  gameState: { type: Object, required: true },
});

const GameState = mongoose.model('GameState', gameStateSchema);
module.exports = GameState;
