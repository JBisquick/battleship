import './styles.css';
import { createGameboard } from './gameboard';
import { createPlayer } from './player.js';
import { setupGame } from './gameloop';

let rotateButton = document.querySelector('.rotate-button');

let player = createPlayer();
let computer = createPlayer();
let playerBoard = createGameboard();
let computerBoard = createGameboard();

rotateButton.addEventListener('click', () => {
  if (rotateButton.value === 'row') {
    rotateButton.value = 'col';
  } else  {
    rotateButton.value = 'row';
  }
});

setupGame(player, computer, playerBoard, computerBoard);