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
      let attack;
      if (cell === 'empty') {
        attack = 'miss';
      } else {
        attack = 'hit';
      }

      const space = document.createElement('div');
      space.classList.add('opSpace');
      board.appendChild(space);
      
      space.addEventListener('click', (e) => {
        loadPlayerAttack(e, attack);
      });
    }
  }
};

const loadPlayerAttack = (e, attack) => {
  e.target.classList.remove('space');
  if (attack === 'miss') {
    e.target.classList.add('miss');
  } else {
    e.target.classList.add('hit');
  }
};

export {
  loadPlayerBoard,
  loadComputerBoard
};