import Player from '../components/Player';
import Platform from '../components/Platform';
import Switch from '../components/Switch';
import Door from '../components/Door';
import Collectible from '../components/Collectible';

export default function createLevel1() {
  const player = new Player(50, 500, 30, 30);

  const platforms = [
    new Platform(0, 900, 2000, 100), // Ground
    new Platform(200, 750, 100, 20),
    new Platform(400, 650, 100, 20),
    new Platform(600, 550, 100, 20),
  ];

  const switches = [new Switch(200, 730, 30, 10, platforms[1])];

  const doors = [new Door(650, 500, 50, 50)];

  const collectibles = [new Collectible(220, 710, 10), new Collectible(420, 610, 10), new Collectible(620, 510, 10)];

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
