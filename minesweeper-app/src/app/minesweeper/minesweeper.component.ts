import { Component, Input, OnInit } from '@angular/core';
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

  toolBarOutOfView: boolean = false;

  constructor(
    private mineService: MinesService, 
    private statService: StatisticsService, 
    private authService: AuthenticationService) { }

  ngOnInit(): void { 
    let toolbar = document.getElementById('toolbar');

    if (toolbar) {
      let intersectionObserver = new IntersectionObserver(  
        this.addStickyClass.bind(this), 
        { threshold: [ 0.50 ]});
      intersectionObserver.observe(toolbar);
    }    
  }

  toggleSelectMode(toggle: boolean) {
    this.markOnSelect = toggle;
  }

  onNewGame(): void {  
    this.mineGameState = new MineSweeperGameState(
      this.selectedGridSize, 
      this.mineService.generateGameCells(this.selectedGridSize),
      this.statService,
      this.authService);
  }

  addStickyClass(entries: IntersectionObserverEntry[], thing: any): void {
    entries.forEach((s) => {
      // there should only be one
      this.toolBarOutOfView = !s.isIntersecting;
    });
  }
}
