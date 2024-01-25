import './styles.css';
import { createGameboard } from './gameboard';
import { createShip } from './ship.js';
import { createPlayer } from './player.js';
import {
  loadComputerBoard,
  loadPlayerBoard
} from './dom.js';

let player = createPlayer();
let computer = createPlayer();

let playerBoard = createGameboard();
let computerBoard = createGameboard();

let patrol = createShip(2);
let submarine = createShip(3);
let destroyer = createShip(3);
let battleship = createShip(4);
let carrier = createShip(5);

playerBoard.placeShip(patrol, 0, 2, 'row');
playerBoard.placeShip(submarine, 7, 6, 'col');
playerBoard.placeShip(destroyer, 0, 4, 'row');
playerBoard.placeShip(battleship, 4, 4, 'row');
playerBoard.placeShip(carrier, 9, 2, 'col');

let patrolC = createShip(2);
let submarineC = createShip(3);
let destroyerC = createShip(3);
let battleshipC = createShip(4);
let carrierC = createShip(5);

computerBoard.placeShip(patrolC, 0, 2, 'row');
computerBoard.placeShip(submarineC, 7, 6, 'col');
computerBoard.placeShip(destroyerC, 0, 4, 'row');
computerBoard.placeShip(battleshipC, 4, 4, 'row');
computerBoard.placeShip(carrierC, 9, 2, 'col');

loadPlayerBoard(playerBoard.getBoard());
loadComputerBoard(computerBoard.getBoard());