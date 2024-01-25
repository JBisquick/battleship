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

      if (cell === 'empty') {
        space.classList.add('miss');
      } else {
        space.classList.add('hit');
      }
    }
  }
};

const loadPlayerAttack = (e, attack) => {
  e.target.classList.remove('opSpace');
  if (attack === 'miss') {
    e.target.classList.add('miss');
  } else {
    e.target.classList.add('hit');
  }
};

export {
  loadPlayerBoard,
  loadComputerBoard,
  loadPlayerAttack
};