const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");

let circleTurn;

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  console.log("clicked!");
}
