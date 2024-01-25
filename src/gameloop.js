import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack
} from './dom.js';

const createGameloop = (player, playGameboard, compGameboard) => {
  loadPlayerBoard(playGameboard.getBoard());
  loadComputerBoard(compGameboard.getBoard());

  let opSpaces = document.querySelectorAll('.opSpace');
  let i = 0;
  for (let space of opSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    space.addEventListener('click', (e) => {
      loadPlayerAttack(e);
      player.attackBoard(compGameboard, x, y);
    });

    i++;
  }
};

export { createGameloop };