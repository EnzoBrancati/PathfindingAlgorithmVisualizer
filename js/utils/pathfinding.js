export function getNeighbors(node, gridSize, grid) {
    const directions = [
        { x: -1, y: 0 }, // Left
        { x: 1, y: 0 },  // Right
        { x: 0, y: -1 }, // Up
        { x: 0, y: 1 }   // Down
    ];
    const neighbors = [];
    for (let dir of directions) {
        const newX = node.x + dir.x;
        const newY = node.y + dir.y;
        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && !grid[newY][newX].isWall) {
            neighbors.push(grid[newY][newX]);
        }
    }
    return neighbors;
}