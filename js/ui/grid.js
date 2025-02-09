export function createGrid(grid, gridSize, gridContainer) {
    grid = [];
    gridContainer.innerHTML = '';
    for (let y = 0; y < gridSize; y++) {
        let row = [];
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            gridContainer.appendChild(cell);
            row.push({
                x: x,
                y: y,
                isWall: false,
                g: Infinity,
                h: 0,
                parent: null,
                element: cell
            });
        }
        grid.push(row);
    }
    return grid;
}

export function highlightNode(x, y, type, grid) {
    console.log(y)
    console.log(grid)
    const cell = grid[y][x];
    cell.element.classList.add(type);
}

export function toggleWall(x, y, grid) {
    const cell = grid[y][x];
    cell.isWall = !cell.isWall;
    if (cell.isWall) {
        cell.element.classList.add("wall");
    } else {
        cell.element.classList.remove("wall");
    }
}

export function visualizePath(path) {
    path.forEach((node, index) => {
        setTimeout(() => {
            node.element.classList.add("path");
        }, index * 50);
    });
}