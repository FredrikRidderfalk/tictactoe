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
const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartButton");
const winningMessage = document.querySelector("#winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// for tracking whose turn it is
let circleTurn;

// we starting/restarting the game!
startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false; // set who goes first
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS); // for restarting the game
    cell.classList.remove(CIRCLE_CLASS); // for restarting the game
    cell.removeEventListener("click", handleClick); // for restarting the game
    cell.addEventListener("click", handleClick, { once: true }); // add an eventListener to each cell
  });
  setBoardHoverClass(); // this is also called in handleClick for every click in a cell
  winningMessage.classList.remove("show"); // for restarting the game
}

// handleClick
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// functions called by handleClick
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

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

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
