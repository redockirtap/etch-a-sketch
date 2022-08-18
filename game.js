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
    }
    

    const navBarList = document.querySelector('ul');
    navBarList.addEventListener('click', toggleModes);    
};

function toggleModes(e) {
    const body = document.querySelector('body');
    const navbar = document.querySelector('.navbar');
    const gridContainer = document.querySelector('.grid');

    let currentMode = e.target;
    let mode = 'multi';
    switch (currentMode.id) {
        case 'noir':
            highlightItem(e);
            changeToNoir(body, navbar, gridContainer);
            mode = 'noir';
            drawGridWithColors(mode);
            break;
        default:
            highlightItem(e);
            changeToMulti(body, navbar, gridContainer);
            drawGridWithColors(mode);
            break;
        case 'grid-size':
            if (body.className === 'noir-style') {
                mode = 'noir';
                getSizeAndCreateGrid(mode);
            } else {
                mode = 'multi';
                getSizeAndCreateGrid(mode);
            }
            break;
        case 'clear':
            console.log('hi');
            clearSketch();
            break;
        case 'eraser':
            eraser();
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

function eraser() {
    const gridCell = document.querySelectorAll('.grid-cell');
    gridCell.forEach(cell => cell.addEventListener('mouseover', eraseCell)); 
}

function eraseCell() {
    this.style.backgroundColor = 'transparent';
}




function changeToNoir(body, navbar, gridContainer) {
    body.classList.add('noir-style');
    navbar.classList.add('noir-style');
    gridContainer.classList.add('noir-style');
    return body;
}

function changeToMulti(body, navbar, gridContainer) {
    body.classList.remove('noir-style');
    navbar.classList.remove('noir-style');
    gridContainer.classList.remove('noir-style');
    console.log('Multi');
    return body;
}


drawGridWithColors();