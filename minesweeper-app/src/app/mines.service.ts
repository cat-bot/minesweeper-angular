import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MineSweeperCell } from './interface/MineSweeperCell';
import { MineSweeperGeneratedGrid } from './interface/MineSweeperGeneratedGrid';
import { MineSweeperGridSize } from './interface/MineSweeperGridSize';

@Injectable({
  providedIn: 'root'
})
export class MinesService {

  constructor() { }

  public generateGameCells(gridSize: MineSweeperGridSize) : MineSweeperGeneratedGrid
  {
    let cellGrid: (MineSweeperCell[])[] = []; 
    let mineCells: MineSweeperCell[] = [];

    // start with cells with generic values
    for(let i = 0; i < gridSize.height; i++) {
      let row: MineSweeperCell[] = [];

      for(let j = 0; j < gridSize.width; j++) {
          let newCell = new MineSweeperCell(i, j);
          row.push(newCell);               
      }

      cellGrid.push(row);
    }

    // sprinkle mines
    let gridSizeRange = this.range(0, gridSize.width*gridSize.height - 1);
    let mines = this.sampleSize(gridSizeRange, gridSize.mines);

    for (let k = 0; k < mines.length; k++) {
        let rowIndex = Math.floor(mines[k]/gridSize.width);
        let colIndex = mines[k] % gridSize.width;

        let mineCell = cellGrid[rowIndex][colIndex];

        mineCell.setIsMine();
        mineCells.push(mineCell);               
    }

    // update adjacent mine count by iterating all mines
    for (let k = 0; k < mines.length; k++) {
      let rowIndex = Math.floor(mines[k]/gridSize.width);
      let colIndex = mines[k] % gridSize.width;

      let otherCoords = this.generateAdjacentCells(gridSize, rowIndex, colIndex);

      // foreach adjacent, if it isnt also a mine, increment its adjacent mine count
      for (let j = 0; j < otherCoords.length; j++) {
          let adjacentCell = cellGrid[otherCoords[j].y][otherCoords[j].x]

          if (!adjacentCell.isMine)
              adjacentCell.incrementAdjacentMineCount();
      }
    }

    let ret = new MineSweeperGeneratedGrid(cellGrid, mineCells, gridSize);

    this.logCells(ret);

    return ret;
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

  private baseRandom(lower: number, upper: number) {
      return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

  private shuffleSelf(array: any[], size: number): any[] {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
          var rand = this.baseRandom(index, lastIndex),
              value = array[rand];

          array[rand] = array[index];
          array[index] = value;
      }

      // clip the array to the requested number of elements
      array.length = size;

      return array;
  }

  private copyArray(source: any[]): any[] {
      var index = -1,
          length = source.length;

      let array = Array(length);
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
  }

  private baseClamp(number: number, lower: number, upper: number): number {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
  }

  private arraySampleSize(array: any[], n: number) {
      return this.shuffleSelf(this.copyArray(array), this.baseClamp(n, 0, array.length));
  }

  private sampleSize(collection: any[], n: number): any[] {
      return this.arraySampleSize(collection, n);
  }

  private range(start: number, end: number): number[] {
      let nums = [];

      for(let i = start; i < end; i++) {
          nums.push(i);
      }

      return nums;
  }

  private logCells(cellGrid: MineSweeperGeneratedGrid) {
    if (!environment.production) {
      console.log(`cell grid:`);
      for (let k = 0; k < cellGrid.grid.length; k++) {
        let row = cellGrid.grid[k];
        let rowString = '';
        for (let j = 0; j < row.length; j++) {
            let cell = row[j];
            rowString += `${cell.adjacentMineCount} `;
        }
        console.log(rowString);
      }
    }
  }
}
