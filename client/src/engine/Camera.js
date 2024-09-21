// src/engine/Camera.js
export default class Camera {
  constructor(canvasWidth, canvasHeight, levelWidth, levelHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
    this.x = 0;
    this.y = Math.max(0, this.levelHeight - this.canvasHeight); // Camera starts at the bottom of the level
    this.smoothFactor = 0.1; // Adjust for smoothness
  }

  follow(player) {
    // Desired camera position to center on the player
    let desiredX = player.x + player.width / 2 - this.canvasWidth / 2;
    let desiredY = player.y + player.height / 2 - this.canvasHeight / 2;

    // Smoothly interpolate camera position
    this.x += (desiredX - this.x) * this.smoothFactor;
    this.y += (desiredY - this.y) * this.smoothFactor;

    // Clamp camera position within level bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.canvasWidth > this.levelWidth) this.x = this.levelWidth - this.canvasWidth;
    if (this.y < 0) this.y = 0;
    if (this.y + this.canvasHeight > this.levelHeight) this.y = this.levelHeight - this.canvasHeight;
  }

  update(canvasWidth, canvasHeight, levelWidth, levelHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
  }
}
