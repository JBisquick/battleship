import { createShip } from '../ship.js';

let destroyer;

beforeEach(() => {
  destroyer = createShip(2);
});

test('ship is hit', () => {
  destroyer.hit();
  expect(destroyer.getHitCount()).toBe(1);
});

test('ship is not sunk', () => {
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(false);
});

test('ship is sunk', () => {
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(true);
});