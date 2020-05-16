const CircleClass = "circle";
const XClass = "x";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(XClass);

    cell.classList.remove(CircleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target; // e stands for event, .target select the element clicked based on e
  const currentClass = circleTurn ? CircleClass : XClass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    swapTurn();
    setHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setHoverClass() {
  board.classList.remove(XClass);
  board.classList.remove(CircleClass);
  if (circleTurn) {
    board.classList.add(CircleClass);
  } else {
    board.classList.add(XClass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endgame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Pareggio!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} vince!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(XClass) || cell.classList.contains(CircleClass)
    );
  });
}
