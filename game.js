// NAVBAR CODE

const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', showNavBar);

function showNavBar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
};

function highlightItem(e) {
    console.log(e.target);
    e.target.classList.toggle('active');
}

// GLOBAL CONSTANTS

const DEF_GRID_SIZE = 16;
const DEF_MODE = 'multi';


// ETCH A SKETCH CODE
// GRID DRAWING AND SIZING


function removeOldGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
};

function clearSketch() {
    const gridCell = document.querySelectorAll('.grid-cell');
    gridCell.forEach(cell => cell.style.backgroundColor = 'transparent');  
}


gridCell = function createGridCell(gridContainer) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    // cell.style.backgroundColor = 'transparent';
    gridContainer.append(cell);
};

function gridIterator(gridSize, gridContainer) {
    let i = gridSize*gridSize;
    while (i) {
        gridCell(gridContainer);
        i--;
    }
};


drawGridWithColors = function createGrid(mode, gridSize) {
    const gridContainer = document.querySelector('.grid'); // Defining grid container
    removeOldGrid(gridContainer); // removing previous grid container, if such exists
    // Drawing the new grid container
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridIterator(gridSize, gridContainer);

    
    const navBarList = document.querySelector('ul');
    navBarList.addEventListener('click', toggleModes);    
};

function toggleModes(e) {
    const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    uncoloredCellsNodeList.forEach(grayCell => grayCell.removeEventListener('mouseover', addGrayCell));
    uncoloredCellsNodeList.forEach(colorCell => colorCell.removeEventListener('mouseover', addColorCell));

    const gridCell = document.querySelectorAll('.grid-cell');

    const body = document.querySelector('body');
    const navbar = document.querySelector('.navbar');
    const gridContainer = document.querySelector('.grid');
    console.log(body);
    let currentMode = e.target;
    let mode = 'multi';
    switch (currentMode.id) {
        case 'noir':
            highlightItem(e);
            console.log('noir');
            changeToNoir(body, navbar, gridContainer, uncoloredCellsNodeList);
            mode = 'noir';
            // drawGridWithColors(mode);
            break;
        default:
            highlightItem(e);
            console.log('color');
            changeToMulti(body, navbar, gridContainer, uncoloredCellsNodeList);
            // drawGridWithColors(mode);
            break;
        case 'grid-size':
            highlightItem(e);
            if (body.className === 'noir-style') {
                mode = 'noir';
                getSizeAndCreateGrid(mode);
            } else {
                mode = 'multi';
                getSizeAndCreateGrid(mode);
            }
            break;
        case 'clear':
            highlightItem(e);
            console.log('hi');
            clearSketch();
            break;
        case 'eraser':
            highlightItem(e);
            eraser(gridCell);
            break;
    }
}


getSizeAndCreateGrid = function userGridSize(mode) {
    // User inputs a value of a grid size, which PASSES to drawGridWithColors()
    let gridSize;
    gridSize = parseInt(prompt("Write down the size of the grid. Warning: 100 is maximum!"));
    if (gridSize > 100) {
        gridSize = 100;
    } else if (isNaN(gridSize)) {
        gridSize = 16;
    }
    // return gridSize;
    drawGridWithColors(mode, gridSize);
}


// COLORING AND ERASING THE GRID

randomNumber = function random() { 
    maxNum = Math.ceil(255);
    minNum = Math.floor(1);
    // console.log(Math.floor((Math.random() * (maxNum - minNum + 1) + minNum)/FACTOR));
    return Math.floor((Math.random() * (maxNum) + minNum));
}


function changeToMulti(body, navbar, gridContainer, uncoloredCellsNodeList) {
    body.classList.remove('noir-style');
    navbar.classList.remove('noir-style');
    gridContainer.classList.remove('noir-style');
    uncoloredCellsNodeList.forEach(colorCell => colorCell.addEventListener('mouseover', addColorCell));
}

function addColorCell(colorCell) {
    let currentCell = colorCell.currentTarget;
    const randomRGB1 = randomNumber();
    const randomRGB2 = randomNumber();
    const randomRGB3 = randomNumber();
    currentCell.style.backgroundColor = `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;
    console.log('multi', randomRGB1, randomRGB2, randomRGB3);  
}


function changeToNoir(body, navbar, gridContainer, uncoloredCellsNodeList) {
    body.classList.add('noir-style');
    navbar.classList.add('noir-style');
    gridContainer.classList.add('noir-style');
    uncoloredCellsNodeList.forEach(grayCell => grayCell.addEventListener('mouseover', addGrayCell));
}

function addGrayCell(grayCell) {
    let currentCell = grayCell.currentTarget;
    const randomRGB = randomNumber();
    currentCell.style.backgroundColor = `rgb(${randomRGB}, ${randomRGB}, ${randomRGB})`;  
    console.log('noir', randomRGB, randomRGB, randomRGB);  
}


function eraser(gridCell) {
    gridCell.forEach(cell => cell.addEventListener('mouseover', eraseCell)); 
}

function eraseCell() {
    this.style.backgroundColor = 'transparent';
    console.log('hi');
}

drawGridWithColors(DEF_MODE, DEF_GRID_SIZE);
