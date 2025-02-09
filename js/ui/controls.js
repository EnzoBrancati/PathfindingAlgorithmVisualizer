import { createGrid, toggleWall, highlightNode } from "./grid.js";
import { dijkstra } from "../utils/algorithms/dijkstra.js";
import { setSpeed } from "../state/state.js";

export function setupControlEvents(gridContainer, gridSize, grid, start, end, path) {

    let currentExploration;

    document.getElementById("startBtn").addEventListener("click", function () {

        const selectedAlgorithm = document.getElementById("algorithm").value;
        const startCoords = document.getElementById("startNode").value.split(',').map(Number);
        const endCoords = document.getElementById("endNode").value.split(',').map(Number);

        start = { x: startCoords[0], y: startCoords[1] };
        end = { x: endCoords[0], y: endCoords[1] };

        grid = createGrid(grid, gridSize, gridContainer);
        highlightNode(start.x, start.y, "start", grid);
        highlightNode(end.x, end.y, "end", grid);

        path = [];
        switch (selectedAlgorithm) {
            case "dijkstra":
                dijkstra(grid, start, end);
                break;

            case "astar":
                //aStar(grid, start, end);
                break;

            default:
                console.error("se")
                break;
        }
    });

    document.getElementById("slowBtn").addEventListener("click", () => {
        setSpeed("slow");
    });

    document.getElementById("mediumBtn").addEventListener("click", () => {
        setSpeed("medium");
    });

    document.getElementById("fastBtn").addEventListener("click", () => {
        setSpeed("fast");
    });
}
