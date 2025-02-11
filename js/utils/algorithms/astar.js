import { visualizePath } from "../../ui/grid.js";
import { getNeighbors } from "../pathfinding.js";
import { speed } from "../../state/state.js";

export function aStar(grid, start, end) {
    const openSet = [grid[start.y][start.x]];
    const closedSet = [];
    let delay = speed;

    function heuristic(node, goal) {
        return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
    }

    grid[start.y][start.x].g = 0;
    grid[start.y][start.x].h = heuristic(grid[start.y][start.x], grid[end.y][end.x]);
    grid[start.y][start.x].f = grid[start.y][start.x].h;

    function startExplorationInterval() {
        let explorationInterval = setInterval(() => {

            if (delay !== speed) {
                clearInterval(explorationInterval);
                delay = speed;
                startExplorationInterval();
                return;
            }
            if (openSet.length === 0) {
                clearInterval(explorationInterval);
                return;
            }

            let current = openSet.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));

            current.element.classList.add("explored");

            if (current.x === end.x && current.y === end.y) {
                let path = [];
                let temp = current;
                while (temp) {
                    path.push(temp);
                    temp = temp.parent;
                }
                path.reverse();
                clearInterval(explorationInterval);
                visualizePath(path);
                return;
            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            for (let neighbor of getNeighbors(current, grid.length, grid)) {
                if (!closedSet.includes(neighbor)) {
                    const tentativeG = current.g + 1;
                    if (tentativeG < neighbor.g) {
                        neighbor.parent = current;
                        neighbor.g = tentativeG;
                        neighbor.h = heuristic(neighbor, grid[end.y][end.x]);
                        neighbor.f = neighbor.g + neighbor.h;
                        if (!openSet.includes(neighbor)) openSet.push(neighbor);
                    }
                }
            }
        }, delay);
    }

    startExplorationInterval();
}