// src/engine/GameEngine.js
import GameLoop from './GameLoop';
import InputHandler from './InputHandler';
import CollisionDetector from './CollisionDetector';
import Camera from './Camera';

export default class GameEngine {
  constructor(context, gameState, canvasWidth, canvasHeight) {
    this.context = context;
    this.gameState = gameState; // Loaded game state passed here
    this.inputHandler = new InputHandler();
    this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this));
    this.camera = new Camera(canvasWidth, canvasHeight, gameState.levelWidth, gameState.levelHeight);
    this.onUpdate = null; // Callback to update HUD state
  }

  // Initialize the game engine (start loop after checking gameState)
  init() {
    if (this.gameState) {
      this.gameLoop.start(); // Only start game loop if gameState is loaded
    } else {
      console.error('Game state is not loaded. Cannot start the game engine.');
    }
  }

  update(deltaTime) {
    if (!this.gameState) return; // Safety check if gameState is not loaded

    this.gameState.update(deltaTime, this.inputHandler); // Update gameState based on deltaTime
    this.gameState.checkCollisions(CollisionDetector); // Handle collisions
    this.camera.follow(this.gameState.player); // Update camera position

    if (this.onUpdate) {
      // Call the HUD update callback
      this.onUpdate();
    }
  }

  render() {
    if (!this.context || !this.gameState) return;

    // Clear the canvas for the next frame
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // Save the current state of the context
    this.context.save();

    // Flip the y-axis to make the bottom-left the origin
    this.context.translate(0, this.context.canvas.height); // Move origin to bottom-left
    this.context.scale(1, -1); // Flip y-axis

    // Apply the camera offset
    this.context.translate(-this.camera.x, -this.camera.y);

    // Render the entire game state
    this.gameState.render(this.context);

    // Restore the context to its original state
    this.context.restore();
  }
}
