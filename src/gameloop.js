import {
  loadComputerBoard,
  loadPlayerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover
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

    node.addEventListener('click', function eventHandler(e) {
      loadPlayerAttack(e);
      player.attackBoard(compGameboard, x, y);

      const saveLocation = computer.computerAttack(playGameboard);
      loadCompAttack(saveLocation[0], saveLocation[1], playSpaces);
      loadGameover(playGameboard, compGameboard);

      this.removeEventListener('click', eventHandler);
    });

    i++;
  }
};

export { createGameloop };