import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MineSweeperCell } from '../interface/MineSweeperCell';

@Component({
  selector: '[app-minesweeper-game-cell]',
  templateUrl: './minesweeper-game-cell.component.html',
  styleUrls: ['./minesweeper-game-cell.component.scss']
})
export class MinesweeperGameCellComponent implements OnInit {
  // cell state
  @Input() mineCell: MineSweeperCell | undefined;
  @Input() difficultyClass: string | undefined;

  constructor() { }

  ngOnInit(): void {}
}
