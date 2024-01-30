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
  board.placeShip(destroyer, 6, 2, 'col');
  expect(board.getBoard()[2][6]).toBe(destroyer);
  expect(board.getBoard()[3][6]).toBe(destroyer);
});

test('ship is on board (row)', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  expect(board.getBoard()[3][5]).toBe(destroyer);
  expect(board.getBoard()[3][6]).toBe(destroyer);
});

test('attack has missed', () => {
  board.recieveAttack(5, 3);
  expect(board.getBoard()[3][5]).toBe('missed');
});

test('attack has hit ship', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  board.recieveAttack(5, 3);
  expect(destroyer.getHitCount()).toBe(1);
});

test('game is not over', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  board.recieveAttack(5, 3);
  expect(board.isGameOver()).toBe(false);
});

test('game is over', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  board.recieveAttack(5, 3);
  board.recieveAttack(6, 3);
  expect(board.isGameOver()).toBe(true);
});

test('correct placement', () => {
  expect(board.isPlacePossible(destroyer, 5, 3, 'row')).toBe(true);
});

test('out of bounce', () => {
  expect(board.isPlacePossible(destroyer, 8, 3, 'row')).toBe(false);
  expect(board.isPlacePossible(destroyer, 3, 8, 'col')).toBe(false);
});

test('overlap', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  let battleship = createShip(4);
  expect(board.isPlacePossible(battleship, 3, 3, 'row')).toBe(false);
});

test.only('neighbor ship', () => {
  board.placeShip(destroyer, 5, 3, 'row');
  let battleship = createShip(2);
  expect(board.isPlacePossible(battleship, 5, 4, 'row')).toBe(false);
});