import './styles.css';
import { createGameboard } from './gameboard';
import { createPlayer } from './player.js';
import { setupGame } from './gameloop';

let player = createPlayer();
let computer = createPlayer();

let playerBoard = createGameboard();
let computerBoard = createGameboard();

// createGameloop(player, computer, playerBoard, computerBoard);

setupGame(playerBoard);