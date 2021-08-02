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

  markOnSelect: boolean = false;

  constructor(private mineService: MinesService, private statsService: StatisticsService, private authService: AuthenticationService) { 
  }

  ngOnInit(): void { }

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

  toggleSelectMode(toggle: boolean): void {
    if (!environment.production) {
      console.log(`changing cell select mode from ${this.markOnSelect} to ${toggle}`);
    }

    this.markOnSelect = toggle;
  }

  onHelp(): void {
    // this.helpState.show = !this.helpState.show;
    // this.helpState.ui = this.helpState.show ? 'X' : '?';
  }
}
