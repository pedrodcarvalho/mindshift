export default class Collectible {
  constructor(x, y, size, color = 'yellow') {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.collected = false;
  }

  update(deltaTime, player, gameState) {
    if (!this.collected && player.x < this.x + this.size && player.x + player.width > this.x && player.y < this.y + this.size && player.y + player.height > this.y) {
      this.collected = true;
      gameState.score++;
    }
  }

  render(context) {
    if (!this.collected) {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
      context.fill();
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size,
    };
  }
}
