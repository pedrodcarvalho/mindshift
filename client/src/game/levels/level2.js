import Player from '../components/Player';
import Platform from '../components/Platform';
import Switch from '../components/Switch';
import Door from '../components/Door';
import Collectible from '../components/Collectible';

export default function createLevel2(savedState = {}) {
  const player = new Player(savedState?.player?.x || 50, savedState?.player?.y || 400, 30, 30);

  const platforms = [
    new Platform(0, 0, 2000, 100), // Ground
    new Platform(200, 220, 100, 20),
    new Platform(400, 320, 100, 20),
    new Platform(600, 420, 100, 20),
  ];

  const switches = [new Switch(200, 240, 30, 10, platforms[1], 'green', savedState?.switches?.[0]?.activated || false)];

  const doors = [new Door(650, 440, 50, 50)];

  const collectibles = [new Collectible(220, 260, 10, 'yellow', savedState?.collectibles?.[0]?.collected || false), new Collectible(420, 360, 10, 'yellow', savedState?.collectibles?.[1]?.collected || false), new Collectible(620, 500, 10, 'yellow', savedState?.collectibles?.[2]?.collected || false)];

  return {
    player,
    platforms,
    switches,
    doors,
    collectibles,
    levelWidth: 2000,
    levelHeight: 1000,
  };
}
