// NAVBAR CODE

function showNavBar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
};

const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', showNavBar);






// ETCH A SKETCH CODE
// GRID DRAWING AND SIZING


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

function toggleModes(e) {
    const body = document.querySelector('body');
    const navbar = document.querySelector('.navbar');
    const gridContainer = document.querySelector('.grid');

    const currentMode = e.currentTarget;
    let mode = 'multi';
    switch (currentMode.id) {
        case 'noir':
            changeToNoir(body, navbar, gridContainer);
            mode = 'noir';
            drawGridWithColors(mode);
            console.log(currentMode);
            break;
        default:
            changeToMulti(body, navbar, gridContainer);
            drawGridWithColors(mode);
            console.log(currentMode);
            break;
        case 'grid-size':
            getSizeAndCreateGrid();
            break;    
    }
}


drawGridWithColors = function createGrid(mode = 'multi', gridSize = 16) {
    const gridContainer = document.querySelector('.grid'); // Defining grid container
    removeOldGrid(gridContainer); // removing previous grid container, if such exist


    // Drawing the new grid container
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridIterator(gridSize, gridContainer);
    const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
    console.log(mode);
    switch (mode) {
        case 'noir':
            uncoloredCellsNodeList.forEach(e => e.addEventListener('mouseover', addGrayCell));
            break;
        case 'multi':
            // const uncoloredCellsNodeList = document.querySelectorAll('.grid-cell');
            uncoloredCellsNodeList.forEach(e => e.addEventListener('mouseover', addColorCell));
            break;
        default:

    }
    

    const navBarList = document.querySelectorAll('li');
    navBarList.forEach(e => e.addEventListener('click', toggleModes));    
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

// const gridBtn = document.querySelector('#grid-size');
// gridBtn.addEventListener('click', getSizeAndCreateGrid);



// COLORING THE GRID

randomNumber = function random() { 
    maxNum = Math.ceil(254);
    minNum = Math.floor(1);
    // console.log(Math.floor((Math.random() * (maxNum - minNum + 1) + minNum)/FACTOR));
    return Math.floor((Math.random() * (maxNum - minNum + 1) + minNum));
}

function addColorCell(e) {
    let currentCell = e.currentTarget;
    const randomRGB1 = randomNumber();
    const randomRGB2 = randomNumber();
    const randomRGB3 = randomNumber();
    currentCell.style.backgroundColor = `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;  
}

function addGrayCell(e) {
    let currentCell = e.currentTarget;
    const randomRGB = randomNumber();
    currentCell.style.backgroundColor = `rgb(${randomRGB}, ${randomRGB}, ${randomRGB})`;  
}





function changeToNoir(body, navbar, gridContainer) {
    body.classList.add('noir-style');
    navbar.classList.add('noir-style');
    gridContainer.classList.add('noir-style');
}

function changeToMulti(body, navbar, gridContainer) {
    body.classList.remove('noir-style');
    navbar.classList.remove('noir-style');
    gridContainer.classList.remove('noir-style');
    console.log('Multi');
}

function changeToPsycho() {
    console.log('Psycho');
}


drawGridWithColors();