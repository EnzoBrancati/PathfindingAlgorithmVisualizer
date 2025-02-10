import { visualizePath } from "../../ui/grid.js";
import { getNeighbors } from "../pathfinding.js";
import { speed } from "../../state/state.js";

export function dijkstra(grid, start, end) {

    const openSet = [grid[start.y][start.x]];
    const closedSet = [];
    let delay = speed;

    grid[start.y][start.x].g = 0;

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

            let current = openSet.reduce((prev, curr) => (prev.g < curr.g ? prev : curr));

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
                        if (!openSet.includes(neighbor)) openSet.push(neighbor);
                    }
                }
            }
        }, delay);
    }

    startExplorationInterval();
}
