function createGameboard () {
  let board = new Array(10);
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10).fill('empty');
  }

  const getBoard = () => {
    return board;
  };

  const placeShip = (ship, x, y, direction) => {
    board[y][x] = ship;
    for (let i = 1; i < ship.length; i++) {
      if (direction === 'col') {
        y += 1;
      } else if (direction === 'row') {
        x += 1;
      }
      board[y][x] = ship;
    }
  };

  const recieveAttack = (x, y) => {
    const cell = board[y][x];
    if (cell === 'empty') {
      board[y][x] = 'missed';
    } else if (typeof cell === 'object') {
      cell.hit();
    }
  };

  const isGameOver = () => {
    for (const row of board) {
      for (const cell of row) {
        // if an object is not sunk then it is not over
        if (typeof cell === 'object' && cell.isSunk() === false) {
          return false;
        }
      }
    }
    // else it is over
    return true;
  };

  return {
    getBoard,
    placeShip,
    recieveAttack,
    isGameOver
  };
}

export { createGameboard };