const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  //HORIZONTAL
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //VERTICAL
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //DIAGONAL
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");

let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}

// handleClick
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  swapTurns();
  setBoardHoverClass();
}

// functions called by handleClick
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
