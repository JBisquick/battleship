function createShip(length, name) {
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
    length,
    name,
    getHitCount,
    hit,
    isSunk
  };
}

export { createShip };