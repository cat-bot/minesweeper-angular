import { MineSweeperCell } from "./MineSweeperCell";
import { MineSweeperGridSize } from "./MineSweeperGridSize";

export class MineSweeperGeneratedGrid {
    constructor(
        grid: (MineSweeperCell[])[],  
        mines: MineSweeperCell[], 
        gridSize: MineSweeperGridSize){
        this.grid = grid;
        this.mines = mines;
        this.gridSize = gridSize;
    }

    public grid: (MineSweeperCell[])[];
    public mines: MineSweeperCell[];
    public gridSize: MineSweeperGridSize;

    public getAdjacentNonMineNonRevealedCells(cell: MineSweeperCell) : MineSweeperCell[] {
        let adjCellIndices = this.generateAdjacentCells(this.gridSize, cell.i, cell.j);
        let adjCells = [];

        for(let i = 0; i < adjCellIndices.length; i++) {
            let c = adjCellIndices[i];
            let adjacentCell = this.grid[c.y][c.x];
 
            if (!adjacentCell.isMine && !adjacentCell.isRevealed)
                adjCells.push(adjacentCell);
        }

        return adjCells;
    }

    private generateAdjacentCells(gridSize: MineSweeperGridSize, rowIndex: number, colIndex: number): any[] {
        // generate 8 adjacent co-ords, clamped to in-bounds
        let otherCoords: any[] = [];
    
        if (rowIndex - 1 >= 0) {
            if (colIndex - 1 >= 0) {
                otherCoords.push({x: colIndex-1, y:rowIndex-1});
            }
    
            otherCoords.push({x: colIndex, y:rowIndex-1});
    
            if (colIndex + 1 < gridSize.width)
                otherCoords.push({x: colIndex+1, y:rowIndex-1});
        }
        
        if (colIndex - 1 >= 0) 
            otherCoords.push({x: colIndex-1, y:rowIndex});
    
        if (colIndex + 1 < gridSize.width)
            otherCoords.push({x: colIndex+1, y:rowIndex});
    
        if (rowIndex + 1 < gridSize.height) {
            if (colIndex - 1 >= 0) 
                otherCoords.push({x: colIndex-1, y:rowIndex+1});
    
            otherCoords.push({x: colIndex, y:rowIndex+1});
    
            if (colIndex + 1 < gridSize.width)
                otherCoords.push({x: colIndex+1, y:rowIndex+1});
        }
    
        return otherCoords;
    }
}