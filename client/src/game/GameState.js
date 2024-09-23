import createLevel1 from './levels/level1';
import createLevel2 from './levels/level2';
import createDefaultLevel from './levels/defaultLevel';

export default class GameState {
  constructor(savedState = {}) {
    this.player = savedState.player || { x: 0, y: 0 };
    this.score = savedState.score || 0;
    this.levelComplete = savedState.levelComplete || false;
    this.collectibles = savedState.collectibles || [];
    this.currentLevel = savedState.currentLevel || 1;
    this.loadLevel(this.currentLevel, savedState);
    this.isTransitioning = false;
  }

  loadLevel(levelNumber, savedState = {}) {
    switch (levelNumber) {
      case 1:
        const level1 = createLevel1(savedState);
        this.player = level1.player;
        this.platforms = level1.platforms;
        this.switches = level1.switches;
        this.doors = level1.doors;
        this.collectibles = level1.collectibles;
        this.levelWidth = level1.levelWidth;
        this.levelHeight = level1.levelHeight;
        break;
      case 2:
        const level2 = createLevel2(savedState);
        this.player = level2.player;
        this.platforms = level2.platforms;
        this.switches = level2.switches;
        this.doors = level2.doors;
        this.collectibles = level2.collectibles;
        this.levelWidth = level2.levelWidth;
        this.levelHeight = level2.levelHeight;
        break;
      // Add more cases for additional levels
      default:
        const defaultLevel = createDefaultLevel(savedState);
        this.player = defaultLevel.player;
        this.platforms = defaultLevel.platforms;
        this.switches = defaultLevel.switches || [];
        this.doors = defaultLevel.doors || [];
        this.collectibles = defaultLevel.collectibles || [];
        this.levelWidth = defaultLevel.levelWidth;
        this.levelHeight = defaultLevel.levelHeight;
        break;
    }
  }

  // Method to save the game state
  saveGameState() {
    return this;
  }

  update(deltaTime, inputHandler) {
    this.player.update(deltaTime, inputHandler);

    // Apply simple gravity and ground collision
    if (this.player.y <= 0) {
      this.player.velocity.y = 0;
      this.player.setOnGround(true);
    } else {
      this.player.setOnGround(false);
    }

    // Restrict player movement to the level boundaries
    if (this.player.x < 0) {
      this.player.x = 0; // Prevent moving left out of bounds
    }
    if (this.player.x + this.player.width > this.levelWidth) {
      this.player.x = this.levelWidth - this.player.width; // Prevent moving right out of bounds
    }
    if (this.player.y + this.player.height > this.levelHeight) {
      this.player.y = this.levelHeight - this.player.height; // Prevent moving above the top boundary
    }
    if (this.player.y < 0) {
      this.player.y = 0; // Prevent moving below the bottom boundary
    }

    // Update platforms
    this.platforms.forEach((platform) => platform.update(deltaTime));

    // Update switches
    this.switches.forEach((sw) => sw.update(deltaTime, inputHandler, this.player));

    // Update doors
    this.doors.forEach((door) => door.update(deltaTime, this.player));

    // Update collectibles
    this.collectibles.forEach((collectible) => collectible.update(deltaTime, this.player, this));

    // Check level completion
    this.doors.forEach((door) => {
      if (!door.open && this.collectibles.every((c) => c.collected)) {
        door.openDoor();
      }
      if (door.open) {
        // Player reaches door to complete level
        if (this.player.x + this.player.width > door.x && this.player.y + this.player.height > door.y) {
          this.levelComplete = true;
        }
      }
    });

    if (this.levelComplete && !this.isTransitioning) {
      this.isTransitioning = true;

      setTimeout(() => {
        this.currentLevel += 1;
        this.loadLevel(this.currentLevel);
        this.levelComplete = false;
        this.isTransitioning = false;
      }, 1000);
    }
  }

  autoSave() {
    return {
      currentLevel: this.currentLevel,
      player: {
        x: this.player.x,
        y: this.player.y,
      },
      collectibles: this.collectibles.map((collectible) => ({
        collected: collectible.collected,
      })),
      score: this.score,
      levelComplete: this.levelComplete,
    };
  }

  checkCollisions(CollisionDetector) {
    // Collision between player and platforms
    this.platforms.forEach((platform) => {
      if (CollisionDetector.checkCollision(this.player, platform)) {
        // Simple collision response: place player on top of the platform
        if (this.player.velocity.y < 0) {
          this.player.y = platform.y + platform.height;
          this.player.velocity.y = 0;
          this.player.setOnGround(true);
        }
      }
    });
  }

  render(context) {
    // Render platforms
    this.platforms.forEach((platform) => platform.render(context));

    // Render switches
    this.switches.forEach((sw) => sw.render(context));

    // Render doors
    this.doors.forEach((door) => door.render(context));

    // Render collectibles
    this.collectibles.forEach((collectible) => collectible.render(context));

    // Render player
    this.player.render(context);
  }
}
