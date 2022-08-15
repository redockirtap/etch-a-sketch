// NAVBAR CODE

function showNavBar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', showNavBar);





// ETCH A SKETCH CODE
// GRID DRAWING AND SIZING
const gridContainer = document.querySelector('.grid');
const gridBtn = document.querySelector('#grid-size');

function removeOldGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

gridCell = function createGridCell() {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    gridContainer.append(cell);
};

drawGrid = function createGrid(gridSize = 16) {
    removeOldGrid();
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    let i = gridSize*gridSize;
    while (i) {
        gridCell();
        i--;
    }
};

getSizeAndCreateGrid = function userGridSize() {
    gridSize = parseInt(prompt('Write down the size of the grid.'));
    drawGrid(gridSize);
}

gridBtn.addEventListener('click', getSizeAndCreateGrid);

drawGrid();


// COLORING THE GRID

const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');


function updateCellsNodeList() {

    uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    return uncoloredCellsNodeList;
}

console.log(uncoloredCellsNodeList);

function random() { 
    maxNum = Math.ceil(254);
    minNum = Math.floor(1);
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

cellIndex = function getCellIndex() {
    // updateCellsNodeList();
    const cellsArray = Array.from(uncoloredCellsNodeList);
    // console.log(cellsArray);
    // console.log(this);
    // console.log(cellsArray.indexOf(this));
    coloredCellIndex = cellsArray.indexOf(this);
    addColorCell(coloredCellIndex);
}



function addColorCell() {
    // console.log(coloredCellIndex);
    randomRGB1 = random();
    randomRGB2 = random();
    randomRGB3 = random();
    uncoloredCellsNodeList[coloredCellIndex].style.backgroundColor = `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;
    // console.log(`hi`);
}


uncoloredCellsNodeList.forEach(eventCell => eventCell.addEventListener('mouseover', cellIndex));


