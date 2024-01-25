import {
  loadComputerBoard,
  loadPlayerBoard
} from './dom.js';

const createGameloop = (playGameboard, compGameboard) => {
  loadPlayerBoard(playGameboard);
  loadComputerBoard(compGameboard);
};

export { createGameloop };