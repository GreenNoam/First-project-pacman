'use strict';

const PACMAN = '👽';
var gPacman;

function createPacman(board) {
  // initialize gPacman...
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gGame.foodCount--;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev);
  if (!nextLocation) return;

  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCell === WALL) return;

  // hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      killGhost(nextLocation);
    } else {
      gameOver();
      return;
    }
  } else if (nextCell === FOOD) {
    handleFood();
  } else if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    handlePowerFood();
  } else if (nextCell === CHERRY) {
    updateScore(10);
  }

  // moving from current location:
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman to new location:
  // update the model
  gPacman.location = nextLocation;
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  // update the DOM
  renderCell(nextLocation, getPacmanHTML());
}

function getNextLocation(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
  }
  // DONE: figure out nextLocation
  return nextLocation;
}

function getPacmanHTML() {
  return `<div >${PACMAN}</div>`;
}

function handleFood() {
  gGame.foodCount--;
  updateScore(1);
  checkVictory();
}

function handlePowerFood() {
  gPacman.isSuper = true;
  renderGhosts();
  setTimeout(() => {
    gPacman.isSuper = false;
    renderGhosts();
  }, 5000);
}
