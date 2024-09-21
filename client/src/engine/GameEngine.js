// src/engine/GameEngine.js
import GameLoop from './GameLoop';
import InputHandler from './InputHandler';
import CollisionDetector from './CollisionDetector';
import Camera from './Camera';

export default class GameEngine {
  constructor(context, gameState, canvasWidth, canvasHeight) {
    this.context = context;
    this.gameState = gameState;
    this.inputHandler = new InputHandler();
    this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this));
    this.camera = new Camera(canvasWidth, canvasHeight, gameState.levelWidth, gameState.levelHeight);
    this.onUpdate = null; // Callback to update HUD state
  }

  init() {
    this.gameLoop.start();
  }

  update(deltaTime) {
    this.gameState.update(deltaTime, this.inputHandler);
    this.gameState.checkCollisions(CollisionDetector);
    this.camera.follow(this.gameState.player);

    if (this.onUpdate) {
      // Update HUD state
      this.onUpdate();
    }
  }

  render() {
    // Clear the canvas for the next frame
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // Save the current state of the context
    this.context.save();

    // Apply the camera offset
    this.context.translate(-this.camera.x, -this.camera.y);

    // Render the entire game state (including the player)
    this.gameState.render(this.context);

    // Restore the context to its original state
    this.context.restore();
  }
}
