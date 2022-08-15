// NAVBAR CODE

function showNavBar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', showNavBar);





// ETCH A SKETCH CODE
// GRID DRAWING AND SIZING
const gridBtn = document.querySelector('#grid-size');

function removeOldGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}


gridCell = function createGridCell(gridContainer) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    gridContainer.append(cell);
};

function gridIterator(gridSize, gridContainer) {
    let i = gridSize*gridSize;
    while (i) {
        gridCell(gridContainer);
        i--;
    }
}


drawGridWithColors = function createGrid(gridSize = 16) {
    const gridContainer = document.querySelector('.grid'); // Defining grid container
    removeOldGrid(gridContainer); // removing previous grid container, if such exist


    // Drawing the new grid container
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridIterator(gridSize, gridContainer);

    // Defining a NodeList of grid cells and adding an Event Listener
    const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    uncoloredCellsNodeList.forEach(e =>
     e.addEventListener('mouseover', getCellIndex.bind(e, uncoloredCellsNodeList)));
};

getSizeAndCreateGrid = function userGridSize() {
    // User inputs a value of a grid size, which PASSES to drawGridWithColors()
    let gridSize;
    gridSize = parseInt(prompt("Write down the size of the grid. Warning: 100 is maximum!"));
    if (gridSize > 100) {
        gridSize = 100;
    } else if (isNaN(gridSize)) {
        gridSize = 16;
    }
    console.log(gridSize);
    drawGridWithColors(gridSize);
}

gridBtn.addEventListener('click', getSizeAndCreateGrid);

drawGridWithColors();


// COLORING THE GRID

function random() { 
    maxNum = Math.ceil(254);
    minNum = Math.floor(1);
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

function getCellIndex(uncoloredCellsNodeList) {
    // Creating an array from Nodelist and receiving its items' indexes
    const cellsArray = Array.from(uncoloredCellsNodeList);
    coloredCellIndex = cellsArray.indexOf(this);
    // PASS Items' indexes and the Node List to addColorCell()
    addColorCell(coloredCellIndex, uncoloredCellsNodeList);
}

function addColorCell(coloredCellIndex, uncoloredCellsNodeList) {
    randomRGB1 = random();
    randomRGB2 = random();
    randomRGB3 = random();
    uncoloredCellsNodeList[coloredCellIndex].style.backgroundColor = `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;
}




