const cells = document.querySelectorAll('[data-cell]');
const modal = document.getElementById('modal');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');
const restartBtn = document.getElementById('restartBtn'); // New line added

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = parseInt(cell.dataset.cell);

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      displayResult(`${currentPlayer} wins!`);
      gameActive = false;
      return;
    }
  }
};

const checkDraw = () => {
  if ([...cells].every(cell => cell.textContent !== '') && gameActive) {
    displayResult('Draw!');
    gameActive = false;
  }
};

const displayResult = (message) => {
  resultMessage.textContent = message;
  modal.style.display = 'block';
};

const restartGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  modal.style.display = 'none';
  gameActive = true;
  currentPlayer = 'X';
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

newGameBtn.addEventListener('click', restartGame);
restartBtn.addEventListener('click', restartGame); // New line added
