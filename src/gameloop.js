import { createShip } from './ship.js'; 
import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover,
  loadShipText
} from './dom.js';

let carrier = createShip(5, 'carrier');
let battleship = createShip(4, 'battleship');
let destroyer = createShip(3, 'destroyer');
let submarine = createShip(3, 'submarine');
let patrolBoat = createShip(2, 'patrol boat');
let shipList = [carrier, battleship, destroyer, submarine, patrolBoat]

const setupGame = (player, computer, playGameboard, compGameboard, ship = 0) => {
  let container = document.querySelector('#player');
  container.innerHTML = '';

  loadPlayerBoard(playGameboard.getBoard());
  loadShipText(shipList[ship].name);
  let placeText = document.querySelector('.place-container');
  placeText.style.display = 'block';

  const rotateButton = document.querySelector('.rotate-button');
  const playSpaces = document.querySelectorAll('.space');
  let i = 0;

  for (let node of playSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', () => {
      playGameboard.placeShip(shipList[ship], x, y, rotateButton.value);

      ship++;
      if (ship < 5) {
        setupGame(player, computer, playGameboard, compGameboard, ship);
      } else {
        createGameloop(player, computer, playGameboard, compGameboard);
        placeText.style.display = 'none';
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
      player.attackBoard(compGameboard, x, y);
      loadPlayerAttack(e);

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