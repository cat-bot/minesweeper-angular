import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MineSweeperGeneratedGrid } from '../interface/MineSweeperGeneratedGrid';
import { MinesService } from '../mines.service';

@Component({
  selector: 'app-minesweeper-game',
  templateUrl: './minesweeper-game.component.html',
  styleUrls: ['./minesweeper-game.component.scss']
})
export class MinesweeperGameComponent implements OnInit {

  // model binding
  @Input() generatedGrid: MineSweeperGeneratedGrid | undefined;

  constructor(public mineService: MinesService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
