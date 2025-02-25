const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let n = 3;
let matrix = Array.from({ length: n }, () => Array(n).fill(EMPTY));

function checkWin(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        if (matrix[i][0] !== EMPTY && matrix[i].every(cell => cell === matrix[i][0])) {
            return matrix[i][0];
        }
    }

    for (let j = 0; j < n; j++) {
        if (matrix[0][j] !== EMPTY && matrix.every(row => row[j] === matrix[0][j])) {
            return matrix[0][j];
        }
    }

    if (matrix[0][0] !== EMPTY && matrix.every((row, index) => row[index] === matrix[0][0])) {
        return matrix[0][0]; 
    }

    if (matrix[0][n - 1] !== EMPTY && matrix.every((row, index) => row[n - 1 - index] === matrix[0][n - 1])) {
        return matrix[0][n - 1];
    }

    return null;
}

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    renderSymbolInCell(ZERO, row, col);
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
