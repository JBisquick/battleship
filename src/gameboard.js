function createGameboard () {
  let board = new Array(10);
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10).fill('empty');
  }

  const getBoard = () => {
    return board;
  };

  const placeShip = (ship, coord, direction) => {
    board[coord[0]][coord[1]] = ship;
    for (let i = 1; i < ship.length; i++) {
      if (direction === 'col') {
        coord[0] += 1;
      } else if (direction === 'row') {
        coord[1] += 1;
      }
      board[coord[0]][coord[1]] = ship;
    }
  };

  const recieveAttack = (coord) => {
    const cell = board[coord[0]][coord[1]];
    if (cell === 'empty') {
      board[coord[0]][coord[1]] = 'missed';
    } else if (typeof cell === 'object') {
      cell.hit();
    }
  };

  return {
    getBoard,
    placeShip,
    recieveAttack
  };
}

export { createGameboard };