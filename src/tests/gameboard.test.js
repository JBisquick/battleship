import { createGameboard } from '../gameboard';
import { createShip } from '../ship.js';

let board;
let destroyer;

beforeEach(() => {
  destroyer = createShip(2);
  board = createGameboard();
});

test('space is empty', () => {
  expect(board.getBoard()[1][4]).toBe('empty');
});

test('ship is on board (col)', () => {
  board.placeShip(destroyer, [2, 6], 'col');
  expect(board.getBoard()[2][6]).toBe(destroyer);
  expect(board.getBoard()[3][6]).toBe(destroyer);
});

test('ship is on board (row)', () => {
  board.placeShip(destroyer, [3, 5], 'row');
  expect(board.getBoard()[3][5]).toBe(destroyer);
  expect(board.getBoard()[3][6]).toBe(destroyer);
});