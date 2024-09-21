export default class Door {
  constructor(x, y, width, height, color = 'brown') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.open = false;
  }

  update(deltaTime, player) {
    if (this.open) {
      // TODO: Allow the player to pass through the door
    }
  }

  render(context) {
    if (!this.open) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  openDoor() {
    this.open = true;
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
