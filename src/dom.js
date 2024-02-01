import { playAgain } from './gameloop';

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
  const container = document.querySelector('.gameboards');

  const board = document.createElement('div');
  board.setAttribute('id', 'computer');
  board.classList.add('board');
  container.appendChild(board);
  
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
  const container = document.querySelector('.over-container');
  const gameover = document.querySelector('.gameover');

  if (opBoard.isGameOver()) {
    gameover.textContent = 'You Have Won!';
  } else if (playerBoard.isGameOver()) {
    gameover.textContent = 'You Have Lost!';
  }

  if (opBoard.isGameOver() || playerBoard.isGameOver()) {
    const replay = document.createElement('button');
    container.appendChild(replay);
    replay.textContent = 'Play Again';
    replay.addEventListener('click', playAgain);

    let opSpaces = document.querySelectorAll('.opSpace');
    for (let node of opSpaces) {
      let newNode = node.cloneNode(true);
      node.parentNode.replaceChild(newNode, node);
    }
  }
};

const loadShipText = (shipName) => {
  const ship = document.querySelector('.place-ship');
  ship.textContent = 'Place your ' + shipName;
};

const rotateShipHover = () => {
  const rotate = document.querySelector('.rotate-button');

  if (rotate.value === 'row') {
    rotate.value = 'col';
  } else  {
    rotate.value = 'row';
  }
};

const loadShipHover = (shipLength) => {
  const rotate = document.querySelector('.rotate-button');
  let spaces = document.querySelectorAll('.space');
  let width;
  let height;

  if (rotate.value === 'row') {
    width = 50 * shipLength;
    height = 50;
  } 
  if (rotate.value === 'col') {
    width = 50;
    height = 50 * shipLength;
  } 
  for (let space of spaces) {
    const ogColor = space.style.backgroundColor;

    space.addEventListener("mouseenter", function( event ) {   
      space.style.backgroundColor = 'pink';
      space.style.width = `${width}px`;
      space.style.height = `${height}px`;
      space.style.zIndex = '1';
    }, false);
    space.addEventListener("mouseleave", function( event ) {   
      space.style.backgroundColor = ogColor;
      space.style.width = '50px';
      space.style.height = '50px';
      space.style.zIndex = '0';
    }, false);
  }
};

export {
  loadPlayerBoard,
  loadComputerBoard,
  loadPlayerAttack,
  loadCompAttack,
  loadGameover,
  loadShipText,
  rotateShipHover,
  loadShipHover
};