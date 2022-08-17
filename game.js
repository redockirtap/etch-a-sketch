// NAVBAR CODE

function showNavBar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
};

const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', showNavBar);

const navBarList = document.querySelectorAll('li');
navBarList.forEach(e => e.addEventListener('click', toggleModes));




// ETCH A SKETCH CODE
// GRID DRAWING AND SIZING
const gridContainer = document.querySelector('.grid'); // Defining grid container

function removeOldGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
};


gridCell = function createGridCell(gridContainer) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.backgroundColor = 'none';
    gridContainer.append(cell);
};

function gridIterator(gridSize, gridContainer) {
    let i = gridSize*gridSize;
    while (i) {
        gridCell(gridContainer);
        i--;
    }
};


drawGridWithColors = function createGrid(gridSize = 16) {
    

    console.log(gridSize);
    removeOldGrid(gridContainer); // removing previous grid container, if such exist


    // Drawing the new grid container
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridIterator(gridSize, gridContainer);


    // Defining a NodeList of grid cells and adding an Event Listener
    const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    uncoloredCellsNodeList.forEach(e =>
     e.addEventListener('mouseover', getCellIndex));
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
    // return gridSize;
    drawGridWithColors(gridSize);
}

const gridBtn = document.querySelector('#grid-size');
gridBtn.addEventListener('click', getSizeAndCreateGrid);



// COLORING THE GRID

randomNumber = function random() { 
    maxNum = Math.ceil(254);
    minNum = Math.floor(1);
    // console.log(Math.floor((Math.random() * (maxNum - minNum + 1) + minNum)/FACTOR));
    return Math.floor((Math.random() * (maxNum - minNum + 1) + minNum)/1);
}
function getCellIndex() {
    const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    // Creating an array from NodeList and receiving its items' indexes
    const cellsArray = Array.from(uncoloredCellsNodeList);
    console.log(typeof this);
    coloredCellIndex = cellsArray.indexOf(this);
    // PASS Items' indexes and the Node List to addColorCell()
    addColorCell(coloredCellIndex, uncoloredCellsNodeList);
}

function addColorCell(coloredCellIndex, uncoloredCellsNodeList) {
    randomRGB1 = randomNumber();
    randomRGB2 = randomNumber();
    randomRGB3 = randomNumber();
    uncoloredCellsNodeList[coloredCellIndex].style.backgroundColor = `rgb(${randomRGB1}, ${randomRGB1}, ${randomRGB1})`;
    console.log(randomRGB1);
}

toggleModes(gridContainer);

function toggleModes(gridContainer) {
    const body = document.querySelector('body');
    const navbar = document.querySelector('.navbar');
    const noir = document.querySelector('#noir');
    const multi = document.querySelector('#multi');
    const psycho = document.querySelector('#psycho');


    
    noir.addEventListener('click', changeToNoir);
    multi.addEventListener('click', changeToMulti);
    psycho.addEventListener('click', changeToPsycho);

    // changeToNoir(body, navbar, gridContainer);
    console.log(body);
    let FACTOR = 1;
    switch (body.className) {
        case 'noir-style':
            FACTOR = 3;
            drawGridWithColors(gridSize = 16, FACTOR);
            console.log(FACTOR);
            break;

        
        default:
            FACTOR = 1;
            drawGridWithColors(gridSize = 16, FACTOR);
            console.log(FACTOR);
            break;
    }
    console.log(FACTOR);
}

function changeToNoir(body, navbar, gridContainer) {
    console.log('Noir');
    body.classList.add('noir-style');
    navbar.classList.add('noir-style');
    gridContainer.classList.add('noir-style');
    return body, navbar, gridContainer;

}

function changeToMulti() {
    console.log('Multi');
}

function changeToPsycho() {
    console.log('Multi');
}


