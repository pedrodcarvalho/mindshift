import React from 'react';
import axios from '../api/axiosInstance';

const SaveGame = ({ gameState }) => {
  const saveGame = async () => {
    const userId = localStorage.getItem('userId');

    if (gameState && userId) {
      const saveData = {
        userId,
        gameState: gameState.saveGameState(),
      };

      try {
        await axios.post('/game/save', saveData);
      } catch (error) {
        console.error('Failed to save game state', error);
      }
    }
  };

  return (
    <div className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded cursor-pointer">
      <span
        className="text-sm font-bold"
        onClick={() => saveGame()}
      >
        Save Game
      </span>
    </div>
  );
};

export default SaveGame;
