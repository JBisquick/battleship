import { createShip } from './ship.js'; 
import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover
} from './dom.js';

let destroyer = createShip(3);

const setupGame = (board) => {
  let container = document.querySelector('#player');
  container.innerHTML = '';

  loadPlayerBoard(board.getBoard());

  let playSpaces = document.querySelectorAll('.space');
  let i = 0;

  for (let node of playSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', function setupShip (e) {
      board.placeShip(destroyer, x, y, 'row');
      setupGame(board);
    });

    i++;
  }
};

const createGameloop = (player, computer, playGameboard, compGameboard) => {
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