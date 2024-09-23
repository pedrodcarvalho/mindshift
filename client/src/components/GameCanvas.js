import React, { useRef, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import GameEngine from '../engine/GameEngine';
import GameState from '../game/GameState';
import { GAME_WIDTH, GAME_HEIGHT } from '../game/constants';
import HUD from './HUD';
import SaveGame from './SaveGame';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: GAME_WIDTH, height: GAME_HEIGHT });
  const [gameState, setGameState] = useState(null);
  const [latestGameState, setLatestGameState] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching game state
  const [score, setScore] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('/auth/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem('userId', response.data.user._id);
      } catch (error) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

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

  // Load game state and block game until it's fetched
  useEffect(() => {
    const loadGameState = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) return;

      try {
        const response = await axios.get(`/game/load/${userId}`);

        if (response.status === 200 && response.data) {
          // Set loaded game state
          setGameState(response.data.gameState);
        }
      } catch (error) {
        console.error('Failed to load saved game state', error);
      } finally {
        setLoading(false); // Stop loading once the game state is fetched
      }
    };

    loadGameState();
  }, []);

  useEffect(() => {
    if (loading || !gameState) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const initialState = new GameState(gameState); // Initialize with saved state
    const gameEngine = new GameEngine(context, initialState, canvas.width, canvas.height);

    // Update HUD state
    gameEngine.onUpdate = () => {
      setScore(initialState.score);
      setLevelComplete(initialState.levelComplete);
    };

    gameEngine.init(); // Initialize game engine only after state is loaded

    setLatestGameState(initialState); // Save the latest game state

    return () => {
      gameEngine.gameLoop.stop();
    };
  }, [loading, gameState]); // Ensure this only runs after game state is loaded

  if (loading) {
    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ border: '1px solid black' }}
      />
      <HUD
        score={score}
        levelComplete={levelComplete}
      />
      <SaveGame gameState={latestGameState} />
    </div>
  );
};

export default GameCanvas;
