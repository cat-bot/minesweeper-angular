import { Component, OnInit } from '@angular/core';
import { MINESWEEPER_GRID_SIZES} from '../interface/MineSweeperConstants';
import { MineSweeperGeneratedGrid } from '../interface/MineSweeperGeneratedGrid';
import { MineSweeperGridSize } from '../interface/MineSweeperGridSize';
import { MinesService } from '../mines.service';
import { environment } from 'src/environments/environment';
import { MineSweeperGameState } from '../interface/MineSweeperGameState';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  availableGridSizes: MineSweeperGridSize[] = MINESWEEPER_GRID_SIZES;
  selectedGridSize: MineSweeperGridSize = this.availableGridSizes[0];     // default to beginner
  mineGameState: MineSweeperGameState | undefined;

  constructor(private mineService: MinesService) { }

  ngOnInit(): void {
  }

  onNewGame(): void {   
    console.log(`start new ${this.selectedGridSize.label} game`);
    // generate grid and game state
    this.mineGameState = new MineSweeperGameState(this.selectedGridSize, this.mineService.generateGameCells(this.selectedGridSize));
  }

  onAutoWin(): void {
    //console.log('auto win game');
  }

  onAutoLose(): void {
    //console.log('auto lose game');
  }
}
