"use strict"

import { createGrid } from "./ui/grid.js";
import { setupControlEvents } from "./ui/controls.js";

let path = [];
let gridSize = 10;
let grid = [];
let start = { x: 0, y: 0 };
let end = { x: 9, y: 9 };

grid = createGrid(grid, gridSize, document.getElementById("root"))

setupControlEvents(document.getElementById("root"), gridSize, grid, start, end, path);
