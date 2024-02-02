import { createShip } from './ship.js'; 
import { createGameboard } from './gameboard';
import { createPlayer } from './player.js';
import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover,
  loadShipText,
  loadShipHover
} from './dom.js';


const setupGame = (player, computer, playGameboard, compGameboard, ship = 0) => {
  let carrier = createShip(5, 'carrier');
  let battleship = createShip(4, 'battleship');
  let destroyer = createShip(3, 'destroyer');
  let submarine = createShip(3, 'submarine');
  let patrolBoat = createShip(2, 'patrol boat');
  let shipList = [carrier, battleship, destroyer, submarine, patrolBoat]

  let container = document.querySelector('#player');
  container.innerHTML = '';

  loadPlayerBoard(playGameboard.getBoard());
  loadShipText(shipList[ship].name);
  loadShipHover(shipList[ship].length);
  let placeText = document.querySelector('.place-container');
  placeText.style.display = 'flex';

  const rotateButton = document.querySelector('.rotate-button');
  rotateButton.addEventListener('click', function changeHover() {
    loadShipHover(shipList[ship].length);
  });

  const playSpaces = document.querySelectorAll('.space');
  let i = 0;

  for (let node of playSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', () => {
      if (playGameboard.isPlacePossible(shipList[ship], x, y, rotateButton.value)) {
        playGameboard.placeShip(shipList[ship], x, y, rotateButton.value);

        ship++;
        if (ship < 5) {
          setupGame(player, computer, playGameboard, compGameboard, ship);
        } else {
          createGameloop(player, computer, playGameboard, compGameboard);
          placeText.style.display = 'none';
        }
      }
    });

    i++;
  }
};

const createGameloop = (player, computer, playGameboard, compGameboard) => {
  let carrierComp = createShip(5, 'carrier');
  let battleshipComp = createShip(4, 'battleship');
  let destroyerComp = createShip(3, 'destroyer');
  let submarineComp = createShip(3, 'submarine');
  let patrolBoatComp = createShip(2, 'patrol boat');

  compGameboard.placeShipRandom(carrierComp)
  compGameboard.placeShipRandom(battleshipComp)
  compGameboard.placeShipRandom(destroyerComp)
  compGameboard.placeShipRandom(submarineComp)
  compGameboard.placeShipRandom(patrolBoatComp)

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

const playAgain = () => {
  let placeText = document.querySelector('.place-container');
  placeText.style.display = 'flex';

  let computerDiv = document.querySelector('#computer');
  computerDiv.remove();
  let playerDiv = document.querySelector('#player');
  playerDiv.innerHTML = '';

  let gameover = document.querySelector('.over-container');
  gameover.innerHTML = '';

 
  let player = createPlayer();
  let computer = createPlayer();
  let playerBoard = createGameboard();
  let computerBoard = createGameboard();
  
  setupGame(player, computer, playerBoard, computerBoard);
};

export { setupGame, playAgain };