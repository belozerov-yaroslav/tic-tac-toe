const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let n = Number(prompt("Введите размер матрицы, например: 3"));  
let matrix = Array.from({ length: n }, () => Array(n).fill(EMPTY));


let step_counter = 0;
let gameEnded = true;


function getMaxStepCount(){
    return n*n;
}

function getAvailableMoves(){
    let moves = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++){
            if (matrix[i][j] === EMPTY)
                moves.push([i, j]);
        }
    }

    return moves;
}

function hardCodeMove(bot_ = CROSS){
    moves = getAvailableMoves();
    console.log(moves);

    for (let pair of moves){
        i = pair[0];
        j = pair[1];
        matrix[i][j] = bot_;
        if (checkWin(matrix))
            return (i,j);
        matrix[i][j] = EMPTY;
    }
    return getRandomPoint(moves);
}

function getRandomPoint(moves){
    const rand = Math.floor(Math.random() * (moves.length));

    return moves[rand];
}

function checkWin(matrix) {
    const n = matrix.length;
    
    for (let i = 0; i < n; i++) {
        if (matrix[i][0] !== EMPTY && matrix[i].every(cell => cell === matrix[i][0])) {
            return matrix[i].map((cell, index) => [i, index]);
        }
    }

    for (let j = 0; j < n; j++) {
        if (matrix[0][j] !== EMPTY && matrix.every(row => row[j] === matrix[0][j])) {
            return matrix.map((row, index) => [index, j]);
        }
    }

    if (matrix[0][0] !== EMPTY && matrix.every((row, index) => row[index] === matrix[0][0])) {
        return matrix.map((row, index) => [index, index]); 
    }

    if (matrix[0][n - 1] !== EMPTY && matrix.every((row, index) => row[n - 1 - index] === matrix[0][n - 1])) {
        return matrix.map((row, index) => [index, n - 1 - index]); 
    }

    return null; 
}
startGame();
addResetListener();

function startGame () {
    renderGrid(n);
    step_counter = 0;
    matrix = Array.from({ length: n }, () => Array(n).fill(EMPTY));
    gameEnded = false;
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

    if (gameEnded){
        alert("Начните новую игру!");
        return;
    }

    if (step_counter == getMaxStepCount()){
        console.log("Game already ended!")
        return;
    }
    
    if (matrix[row][col] !== EMPTY){
        return;
    }
    

    let current_step = step_counter % 2 === 0 ? ZERO : CROSS;
    matrix[row][col] = current_step;
    renderSymbolInCell(current_step, row, col);
    step_counter += 1;
    let winner = checkWin(matrix);
    if (winner !== null){
        gameEnded = true;
        switch (matrix[winner[0][0]][winner[0][1]]){
            case CROSS:
                alert("Победили крестики");
                break;
            case ZERO:
                alert("Победили нолики");
                break;
        }
        for (let coords of winner){
            renderSymbolInCell(matrix[winner[0][0]][winner[0][1]], coords[0], coords[1], "red")
        }
        return;
    }
    /*if (step_counter > (n * n) / 2){
        increaseMatrixSize();
    }*/ 
    let point = hardCodeMove();
    if (step_counter % 2 === 1){
        cellClickHandler(point[0], point[1]);
    }
    if (step_counter === getMaxStepCount()){
        console.log("Game End!")
        alert("Победила Дружба!")
    }
}

function increaseMatrixSize(){
    for (let row of matrix){
        row.unshift(EMPTY);
        row.push(EMPTY);
    }
    matrix.push(Array(n + 2).fill(EMPTY));
    matrix.unshift(Array(n + 2).fill(EMPTY));
    n = n + 2;
    renderGrid(n);
    for (let row = 0; row < matrix.length; row++){
        for (let column = 0; column < matrix.length; column++){
            renderSymbolInCell(matrix[row][column], row, column);
        }
    }
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
