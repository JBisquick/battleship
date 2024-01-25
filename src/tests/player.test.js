import { createGameboard } from '../gameboard';
import { createShip } from '../ship.js';
import { createPlayer } from '../player.js';


let board;
let destroyer;
let player;

beforeEach(() => {
  board = createGameboard();
  destroyer = createShip(2);
  player = createPlayer();
  board.placeShip(destroyer, 3, 5);
});

test('player attacks board', () => {
  player.attackBoard(board, 3, 5);
  expect(destroyer.getHitCount()).toBe(1);
});

test('player tries to attacks same space twice', () => {
  player.attackBoard(board, 3, 5);
  player.attackBoard(board, 3, 5);
  expect(destroyer.getHitCount()).toBe(1);
});
