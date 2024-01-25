import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack
} from './dom.js';

const createGameloop = (playGameboard, compGameboard) => {
  loadPlayerBoard(playGameboard);
  loadComputerBoard(compGameboard);

  let opSpaces = document.querySelectorAll('.opSpace');
  for (let space of opSpaces) {
    space.addEventListener('click', (e) => {
      loadPlayerAttack(e);
    });
  }
};

export { createGameloop };