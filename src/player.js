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

  let nextAttack = [];
  let lastHits = [];

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

  const updateNextAttack = (x, y) => {
    let i = 0;
    for (let cell of nextAttack) {
      if (x === cell[0] && y === cell[1]) {
        break;
      }
      i++;
    }
    nextAttack.splice(i, 1);
  };

  const attackBoard = (gameboard, x, y) => {
    if (checkIfVisted(x, y) === true) {
      return;
    }

    updateUnvisited(x, y);
    gameboard.recieveAttack(x, y);
  };

  const computerAttack = (gameboard) => {
    if (nextAttack.length > 0)  {
      // try to find boat once hit has occured
      return smartAttack(gameboard);
    } else {
      // reset last hits
      lastHits = [];
      return randomAttack(gameboard);
    }
  };

  const smartAttack = (gameboard) => {
    const randomIndex = Math.floor(Math.random() * nextAttack.length);
    const randomCoord = nextAttack[randomIndex];
    updateUnvisited(randomCoord[0], randomCoord[1]);
    updateNextAttack(randomCoord[0], randomCoord[1]);
    const attack = gameboard.recieveAttack(randomCoord[0], randomCoord[1]);
    if (typeof attack === 'object') {
      lastHits.push([randomCoord[0], randomCoord[1]]);
      // once two hits go along the column or row
      trySinkShip();
    }
    console.log(nextAttack);
    return [randomCoord[0], randomCoord[1]];
  };

  const randomAttack = (gameboard) => {
    const randomIndex = Math.floor(Math.random() * unvisited.length);
    const randomCoord = unvisited[randomIndex];
    updateUnvisited(randomCoord[0], randomCoord[1]);
    const attack = gameboard.recieveAttack(randomCoord[0], randomCoord[1]);
    if (typeof attack === 'object') {
      lastHits.push([randomCoord[0], randomCoord[1]]);
      // find nearby spaces after hit
      addNextAttacks(randomCoord[0], randomCoord[1]);
    }
    return [randomCoord[0], randomCoord[1]];
  };

  const addNextAttacks = (x, y) => {
    if (checkIfVisted(x - 1, y) === false) {
      nextAttack.push([x-1, y])
    }
    if (checkIfVisted(x, y - 1) === false) {
      nextAttack.push([x, y-1])
    }
    if (checkIfVisted(x + 1, y) === false) {
      nextAttack.push([x+1, y])
    }
    if (checkIfVisted(x, y + 1) === false) {
      nextAttack.push([x, y+1])
    }
    console.log(nextAttack);
  };

  const trySinkShip = () => {
    nextAttack = [];
    const changeInCoords = lastHits[0] - lastHits[1];
    for (const hit of lastHits) {
      const x = hit[0];
      const y = hit[1];

      // if along x axis
      if (changeInCoords[0] !== 0) {
        if (checkIfVisted(x + 1, y) === false) {
          nextAttack.push([x+1, y])
        }
        if (checkIfVisted(x - 1, y) === false) {
          nextAttack.push([x-1, y])
        }

      // if along y axis
      } else {
        if (checkIfVisted(x, y + 1) === false) {
          nextAttack.push([x, y+1])
        }
        if (checkIfVisted(x, y - 1) === false) {
          nextAttack.push([x, y-1])
        }
      }
    }
  };

  return {
    attackBoard,
    computerAttack
  };
};

export { createPlayer };
