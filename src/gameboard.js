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
      return cell;
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

  const isPlacePossible = (ship, x, y, direction) => {
    if (isOutOfBounce(ship, x, y, direction)) {
      return false;
    }
    if (isOverlap(ship, x, y, direction)) {
      return false;
    }
    if (isNeighbor(ship, x, y, direction)) {
      return false;
    }
    return true;
  };

  const isOutOfBounce = (ship, x, y, direction) => {
    if (direction === 'row' && (x + ship.length > 10)) {
      return true;
    }
    if (direction === 'col' && (y + ship.length > 10)) {
      return true;
    }

    return false;
  };

  const isOverlap = (ship, x, y, direction) => {
    for (let i = 1; i <= ship.length; i++) {
      if (board[y][x] !== 'empty') {
        return true
      }

      if (direction === 'col') {
        y += 1;
      } else if (direction === 'row') {
        x += 1;
      }
    }

    return false;
  };

  const isNeighbor = (ship, x, y, direction) => {
    for (let i = 1; i <= ship.length; i++) {
      if (x !== 9 && board[y][x+1] !== 'empty' ) {
        return true;
      }
      if (x !== 0 && board[y][x-1] !== 'empty' ) {
        return true;
      }
      if (y !== 9 && board[y+1][x] !== 'empty') {
        return true;
      }
      if (y !== 0 && board[y-1][x] !== 'empty') {
        return true;
      }

      if (direction === 'col') {
        y += 1;
      } else if (direction === 'row') {
        x += 1;
      }
    }

    return false;
  };

  const placeShipRandom = (ship) => {
    const randomDirection = Math.floor(Math.random() * 2);
    let direction;
    if (randomDirection === 1) {
      direction = 'row';
    } else {
      direction = 'col';
    }

    let notPlaced = true;
    while (notPlaced) {
      const randomCoord = Math.floor(Math.random() * 99);
      const x = randomCoord % 10;
      const y = Math.floor(randomCoord / 10);

      if (isPlacePossible(ship, x, y, direction)) {
        placeShip(ship, x, y, direction);
        notPlaced = false;
      } 
    }
  };

  return {
    getBoard,
    placeShip,
    recieveAttack,
    isGameOver,
    isPlacePossible,
    placeShipRandom
  };
}

export { createGameboard };