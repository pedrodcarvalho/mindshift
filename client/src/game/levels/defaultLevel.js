import Player from '../components/Player';
import Platform from '../components/Platform';

export default function createLevel1(savedState = {}) {
  const player = new Player(savedState?.player?.x || 50, savedState?.player?.y || 400, 30, 30);

  const platforms = [
    new Platform(0, 0, 2000, 100), // Ground
  ];

  return {
    player,
    platforms,
    levelWidth: 2000,
    levelHeight: 1000,
  };
}
