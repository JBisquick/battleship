import './styles.css';
import { createGameboard } from './gameboard';
import { createPlayer } from './player.js';
import { setupGame } from './gameloop';
import { rotateShipHover } from './dom';

let rotateButton = document.querySelector('.rotate-button');

rotateButton.addEventListener('click', rotateShipHover);

let player = createPlayer();
let computer = createPlayer();
let playerBoard = createGameboard();
let computerBoard = createGameboard();

setupGame(player, computer, playerBoard, computerBoard);