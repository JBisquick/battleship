const loadPlayerBoard = (gameboard) => {
  const board = document.querySelector('#player');
  for (const row of gameboard) {
    for (const cell of row) {
      const space = document.createElement('div');
      space.classList.add('space');
      if (typeof cell === 'object') {
        space.classList.add('ship');
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

      // predetermine if they are hits or not
      if (cell === 'empty') {
        space.classList.add('miss');
      } else {
        space.classList.add('hit');
      }
    }
  }
};

const loadPlayerAttack = (e) => {
  e.target.classList.remove('opSpace');
};

const loadCompAttack = (x, y, playerNodes) => {
  let destination = y * 10;
  destination += x;
  let i = 0;

  for (let node of playerNodes) {
    // If the correct node then continue
    if (i === destination) {
      
      if (node.classList.contains('ship')) {
        node.classList.add('hit');
        node.classList.remove('ship');
      } else {
        node.classList.add('miss');
      }

      node.classList.remove('space');
    }
    i++;
  }
};

const loadGameover = (playerBoard, opBoard) => {
  const gameover = document.querySelector('.gameover');

  if (opBoard.isGameOver()) {
    gameover.textContent = 'You Have Won!';
  } else if (playerBoard.isGameOver()) {
    gameover.textContent = 'You Have Lost!';
  }
};

export {
  loadPlayerBoard,
  loadComputerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover
};