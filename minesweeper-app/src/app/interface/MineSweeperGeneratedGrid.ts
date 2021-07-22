import { MineSweeperCell } from "./MineSweeperCell";
import { MINESWEEPER_GRID_SIZES } from "./MineSweeperConstants";
import { MineSweeperGridSize } from "./MineSweeperGridSize";

export class MineSweeperGeneratedGrid {
    constructor(){
        // just defaults ...
        this.grid = [];
        this.mines = [];
        this.gridSize = MINESWEEPER_GRID_SIZES[0];
    }

    public grid: (MineSweeperCell[])[];
    public mines: MineSweeperCell[];
    public gridSize: MineSweeperGridSize;
}