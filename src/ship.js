function createShip(length) {
  let hitCount = 0;

  const getHitCount = () => {
    return hitCount;
  };

  const hit = () => {
    hitCount += 1;
  };

  const isSunk = () => {
    if (length - hitCount <= 0) {
      return true
    }
    return false;
  };

  return {
    getHitCount,
    hit,
    isSunk
  };
}

export { createShip };