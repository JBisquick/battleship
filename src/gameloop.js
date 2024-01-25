import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack
} from './dom.js';

const createGameloop = (player, computer, playGameboard, compGameboard) => {
  loadPlayerBoard(playGameboard.getBoard());
  loadComputerBoard(compGameboard.getBoard());

  let playSpaces = document.querySelectorAll('.space');
  let opSpaces = document.querySelectorAll('.opSpace');
  let i = 0;

  for (let node of opSpaces) {
    const y = Math.floor(i / 10)
    const x = i % 10;

    node.addEventListener('click', (e) => {
      loadPlayerAttack(e);
      player.attackBoard(compGameboard, x, y);

      const compAttack = computer.computerAttack(playGameboard);
      loadCompAttack(compAttack[0], compAttack[1], playSpaces);
    });

    i++;
  }
};

export { createGameloop };