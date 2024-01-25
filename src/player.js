function createPlayer() {
  let unvisited = [];
  let coord = [0, 0];
  for (let i = 0; i < 100; i++) {
    unvisited.push([coord[0], coord[1]]);
    // increase x
    if (coord[0] < 9) {
      coord[0] += 1;
    // increase y and reset x
    } else {
      coord[1] += 1;
      coord[0] = 0;
    }
  }

  const checkIfVisted = (x, y) => {
    for (const cell of unvisited) {
      if (cell[0] === x && cell[1] === y) {
        return false;
      }
    }
    return true;
  }

  const updateUnvisited = (x, y) => {
    let i = 0;
    for (let cell of unvisited) {
      if (x === cell[0] && y === cell[1]) {
        break;
      }
      i++;
    }
    unvisited.splice(i, 1);
  };

  const attackBoard = (gameboard, x, y) => {
    if (checkIfVisted(x, y) === true) {
      return;
    }

    updateUnvisited(x, y);
    gameboard.recieveAttack(x, y);
  };

  const computerAttack = (gameboard) => {
    const randomIndex = Math.floor(Math.random() * unvisited.length);
    const randomCoord = unvisited[randomIndex];
    updateUnvisited(randomCoord[0], randomCoord[1]);
    gameboard.recieveAttack(randomCoord[0], randomCoord[1]);
    return [randomCoord[0], randomCoord[1]];
  };

  return {
    attackBoard,
    computerAttack
  };
};

export { createPlayer };
