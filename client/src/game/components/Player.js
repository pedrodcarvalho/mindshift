import { GRAVITY } from '../constants';

export default class Player {
  constructor(x, y, width, height, color = 'lightblue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = { x: 0, y: 0 };
    this.speed = 200;
    this.jumpStrength = -500;
    this.onGround = false;

    // Coyote time properties
    this.coyoteTime = 0;
    this.coyoteTimeDuration = 0.2;

    // Double jump properties
    this.canDoubleJump = false;
    this.jumpButtonPressed = false;

    // Dash properties
    this.dashSpeed = 600;
    this.dashDuration = 0.2;
    this.dashCooldown = 1;
    this.isDashing = false;
    this.dashTime = 0;
    this.lastDashTime = 0;
    this.dashColor = 'tomato';
  }

  update(deltaTime, input) {
    const seconds = deltaTime / 1000;

    // Update coyote time
    if (!this.onGround) {
      this.coyoteTime -= seconds;
    } else {
      // Reset coyote time and allow double jump
      this.coyoteTime = this.coyoteTimeDuration;
      this.canDoubleJump = true;
    }

    // Handle dash
    if (this.isDashing) {
      this.dashTime -= seconds;
      if (this.dashTime <= 0) {
        this.isDashing = false; // End the dash
      }
    }

    // Horizontal Movement
    let movingLeft = input.isKeyPressed('ArrowLeft') || input.isKeyPressed('a');
    let movingRight = input.isKeyPressed('ArrowRight') || input.isKeyPressed('d');

    if (!this.isDashing) {
      if (movingLeft) {
        this.velocity.x = -this.speed;
      } else if (movingRight) {
        this.velocity.x = this.speed;
      } else {
        this.velocity.x = 0;
      }
    } else {
      // Maintain dash direction
      this.velocity.x = this.velocity.x > 0 ? this.dashSpeed : -this.dashSpeed;
    }

    // Jumping with coyote time and double jump
    const jumpPressed = input.isKeyPressed('ArrowUp') || input.isKeyPressed('w') || input.isKeyPressed(' ');

    if (jumpPressed && !this.jumpButtonPressed) {
      if (this.onGround) {
        this.velocity.y = this.jumpStrength;
        this.onGround = false; // Player is no longer on the ground
      } else if (this.canDoubleJump) {
        // Allow double jump and prevent further double jumps
        this.velocity.y = this.jumpStrength;
        this.canDoubleJump = false;
      } else if (this.coyoteTime > 0) {
        // Allow jump during coyote time
        this.velocity.y = this.jumpStrength;
        this.coyoteTime = 0;
      }
      this.jumpButtonPressed = true;
    } else if (!jumpPressed) {
      this.jumpButtonPressed = false;
    }

    // Check for dash input
    if (input.isKeyPressed('c') && !this.isDashing && performance.now() / 1000 - this.lastDashTime > this.dashCooldown) {
      if (movingLeft) {
        this.startDash('left');
      } else if (movingRight) {
        this.startDash('right');
      }
    }

    // GRAVITY * seconds => 1500px * 0.0167s = fall rate of 25px/s
    this.velocity.y += GRAVITY * seconds;

    // Update position
    this.x += this.velocity.x * seconds;
    this.y += this.velocity.y * seconds;
  }

  startDash(direction) {
    this.isDashing = true;
    this.dashTime = this.dashDuration; // Set the dash time
    this.velocity.x = direction === 'left' ? -this.dashSpeed : this.dashSpeed; // Set dash velocity
    this.lastDashTime = performance.now() / 1000; // Record the time of the dash
  }

  render(context) {
    context.fillStyle = this.isDashing ? this.dashColor : this.color;

    if (this.isDashing) {
      if (this.velocity.x > 0) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y + this.height / 2);
        context.lineTo(this.x, this.y + this.height);
        context.fill();
      }
      if (this.velocity.x < 0) {
        context.beginPath();
        context.moveTo(this.x + this.width, this.y);
        context.lineTo(this.x, this.y + this.height / 2);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.fill();
      }
    } else {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  setOnGround(status) {
    this.onGround = status;
  }
}
