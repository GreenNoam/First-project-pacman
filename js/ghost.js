'use strict';

const GHOST = '👻';
var gGhosts;
var gGhostsInterval;

function createGhosts(board) {
  gGhosts = [];
  // DONE: 3 ghosts and an interval
  for (var i = 0; i < 3; i++) {
    createGhost(board);
  }
  gGhostsInterval = setInterval(moveGhosts, 1000);
}

function createGhost(board) {
  // DONE
  const ghost = {
    location: {
      i: 2,
      j: 6,
    },
    currCellContent: FOOD,
    ghostColor: getRandomColor(),
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i];
    moveGhost(ghost);
  }
}

function moveGhost(ghost) {
  const moveDiff = getMoveDiff();
  // console.log('moveDiff:', moveDiff)
  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCell === GHOST) return;
  if (nextCell === WALL) return;

  // hitting a pacman? call gameOver
  if (nextCell === PACMAN) {
    if (gPacman.isSuper) return;
    gameOver();
    return;
  }

  // moving from current location:
  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // Move the ghost to new location:
  // update the model
  ghost.currCellContent = nextCell;
  ghost.location = nextLocation;
  gBoard[nextLocation.i][nextLocation.j] = GHOST;
  // update the DOM
  renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4);

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }; // right
    case 2:
      return { i: 1, j: 0 }; // down
    case 3:
      return { i: 0, j: -1 }; // left
    case 4:
      return { i: -1, j: 0 }; // up
  }
}

function getGhostHTML(ghost) {
  const color = gPacman.isSuper ? 'red' : ghost.color;
  return `<span style="background-color:${color};">${GHOST}</span>`;
}
function renderGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    renderCell(currGhost.location, getGhostHTML(currGhost));
  }
}
function killGhost(location) {
  // console.log(gGhosts)
  for (var i = 0; i < gGhosts.length; i++) {
    var currLocation = gGhosts[i].location;
    if (currLocation.i === location.i && currLocation.j === location.j) {
      const deadGhost = gGhosts.splice(i, 1)[0];
      // console.log('deadGhost', deadGhost);
      checkGhostCellContent(deadGhost);
      setTimeout(reviveGhost, 5000, deadGhost);
    }
  }
}
function checkGhostCellContent(ghost) {
  if (ghost.currCellContent === FOOD) {
    handleFood();
    ghost.currCellContent = EMPTY;
  }
}

function reviveGhost(ghost) {
  gGhosts.push(ghost);
}
