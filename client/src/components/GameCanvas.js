import React, { useRef, useEffect, useState } from 'react';
import GameEngine from '../engine/GameEngine';
import GameState from '../game/GameState';
import { GAME_WIDTH, GAME_HEIGHT } from '../game/constants';
import HUD from './HUD';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: GAME_WIDTH, height: GAME_HEIGHT });

  const [score, setScore] = useState(0); // Track the score state
  const [levelComplete, setLevelComplete] = useState(false); // Track if the level is complete

  useEffect(() => {
    const handleResize = () => {
      const width = GAME_WIDTH;
      const height = GAME_HEIGHT;
      setDimensions({ width, height });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const gameState = new GameState();
    gameState.loadLevel(gameState.currentLevel);

    const gameEngine = new GameEngine(context, gameState, canvas.width, canvas.height);

    // Update HUD state
    gameEngine.onUpdate = () => {
      setScore(gameState.score);
      setLevelComplete(gameState.levelComplete);
    };

    gameEngine.init();

    return () => {
      gameEngine.gameLoop.stop();
    };
  }, []);

  return (
    <div className="relative">
      {/* GameCanvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ border: '1px solid black' }}
      />

      {/* HUD */}
      <HUD
        score={score}
        levelComplete={levelComplete}
      />
    </div>
  );
};

export default GameCanvas;
