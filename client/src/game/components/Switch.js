export default class Switch {
  constructor(x, y, width, height, targetPlatform, color = 'green') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.targetPlatform = targetPlatform;
    this.color = color;
    this.activated = false;
  }

  update(player) {
    if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.y + player.height > this.y) {
      this.activated = !this.activated;
      this.targetPlatform.visible = !this.targetPlatform.visible;
    }
  }

  render(context) {
    context.fillStyle = this.activated ? 'lightgreen' : this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
