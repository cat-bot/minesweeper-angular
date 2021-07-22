import { Component, OnInit } from '@angular/core';
import { MINESWEEPER_GRID_SIZES} from '../interface/MineSweeperConstants';
import { MineSweeperGeneratedGrid } from '../interface/MineSweeperGeneratedGrid';
import { MineSweeperGridSize } from '../interface/MineSweeperGridSize';
import { MinesService } from '../mines.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  availableGridSizes: MineSweeperGridSize[] = MINESWEEPER_GRID_SIZES;
  selectedGridSize: MineSweeperGridSize = this.availableGridSizes[0];     // default to beginner
  mineGrid: MineSweeperGeneratedGrid | undefined;

  constructor(private mineService: MinesService) { }

  ngOnInit(): void {
  }

  onNewGame(): void {   
    console.log(`start new ${this.selectedGridSize.label} game`);
    this.mineGrid = this.mineService.generateGameCells(this.selectedGridSize);
    this.logCells(this.mineGrid)
  }

  onAutoWin(): void {
    //console.log('auto win game');
  }

  onAutoLose(): void {
    //console.log('auto lose game');
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
