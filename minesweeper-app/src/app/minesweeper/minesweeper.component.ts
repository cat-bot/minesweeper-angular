import { Component, OnInit } from '@angular/core';
import { MINESWEEPER_GRID_SIZES} from '../interface/MineSweeperConstants';
import { MineSweeperGridSize } from '../interface/MineSweeperGridSize';
import { MinesService } from '../mines.service';
import { environment } from 'src/environments/environment';
import { MineSweeperGameState } from '../interface/MineSweeperGameState';
import { StatisticsService } from '../statistics.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  availableGridSizes: MineSweeperGridSize[] = MINESWEEPER_GRID_SIZES;
  selectedGridSize: MineSweeperGridSize = this.availableGridSizes[0];     // default to beginner
  mineGameState: MineSweeperGameState | undefined;

  constructor(private mineService: MinesService, private statsService: StatisticsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onNewGame(): void {  
    if (!environment.production) {
      console.log(`start new ${this.selectedGridSize.label} game`);
    }

    this.mineGameState = new MineSweeperGameState(
      this.selectedGridSize, 
      this.mineService.generateGameCells(this.selectedGridSize),
      this.statsService,
      this.authService);
  }

  onAutoWin(): void {
    if (!environment.production) {
      console.log('auto win game');
    }

    this.mineGameState?.triggerAutoWin();
  }

  onAutoLose(): void {
    if (!environment.production) {
      console.log('auto lose game');
    }

    this.mineGameState?.triggerAutoLose();
  }
}
