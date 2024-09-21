import Player from '../components/Player';
import Platform from '../components/Platform';
import Switch from '../components/Switch';
import Door from '../components/Door';
import Collectible from '../components/Collectible';

export default function createLevel1() {
  const player = new Player(50, 400, 30, 30);

  const platforms = [
    new Platform(0, 0, 2000, 100), // Ground
    new Platform(200, 220, 100, 20),
    new Platform(400, 320, 100, 20),
    new Platform(600, 420, 100, 20),
  ];

  const switches = [new Switch(200, 260, 30, 10, platforms[1])];

  const doors = [new Door(650, 450, 50, 50)];

  const collectibles = [new Collectible(220, 280, 10), new Collectible(420, 380, 10), new Collectible(620, 480, 10)];

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
