import { createShip } from './ship.js'; 
import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover
} from './dom.js';

let carrier = createShip(5);
let battleship = createShip(4);
let destroyer = createShip(3);
let submarine = createShip(3);
let patrolBoat = createShip(2);
let shipList = [carrier, battleship, destroyer, submarine, patrolBoat]

const setupGame = (player, computer, playGameboard, compGameboard, ship = 0) => {
  let container = document.querySelector('#player');
  container.innerHTML = '';

  loadPlayerBoard(playGameboard.getBoard());

  let playSpaces = document.querySelectorAll('.space');
  let i = 0;

  for (let node of playSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', () => {
      playGameboard.placeShip(shipList[ship], x, y, 'row');
      ship++;
      if (ship < 5) {
        setupGame(player, computer, playGameboard, compGameboard, ship);
      } else {
        createGameloop(player, computer, playGameboard, compGameboard);
      }
    });

    i++;
  }
};

const createGameloop = (player, computer, playGameboard, compGameboard) => {
  let container = document.querySelector('#player');
  container.innerHTML = '';

  loadPlayerBoard(playGameboard.getBoard());
  loadComputerBoard(compGameboard.getBoard());

  let playSpaces = document.querySelectorAll('.space');
  let opSpaces = document.querySelectorAll('.opSpace');
  let i = 0;

  for (let node of opSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', function gameloop(e) {
      loadPlayerAttack(e);
      player.attackBoard(compGameboard, x, y);

      const saveLocation = computer.computerAttack(playGameboard);
      loadCompAttack(saveLocation[0], saveLocation[1], playSpaces);

      // only loads if true
      loadGameover(playGameboard, compGameboard);

      this.removeEventListener('click', gameloop);
    });

    i++;
  }
};

export { createGameloop, setupGame };