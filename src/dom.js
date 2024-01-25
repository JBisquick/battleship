const loadPlayerBoard = (gameboard) => {
  const board = document.querySelector('#player');
  for (const row of gameboard) {
    for (const cell of row) {
      const space = document.createElement('div');
      space.classList.add('space');
      if (typeof cell === 'object') {
        space.style.backgroundColor = 'grey';
      }
      board.appendChild(space);
    }
  }
};

const loadComputerBoard = (compGameboard) => {
  const board = document.querySelector('#computer');
  for (const row of compGameboard) {
    for (const cell of row) {
      const space = document.createElement('div');
      space.classList.add('opSpace');
      board.appendChild(space);
    }
  }
};

export {
  loadPlayerBoard,
  loadComputerBoard
};