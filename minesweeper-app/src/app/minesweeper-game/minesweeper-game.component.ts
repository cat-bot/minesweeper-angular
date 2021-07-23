import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MineSweeperCell } from '../interface/MineSweeperCell';
import { MineSweeperGameState } from '../interface/MineSweeperGameState';

@Component({
  selector: 'app-minesweeper-game',
  templateUrl: './minesweeper-game.component.html',
  styleUrls: ['./minesweeper-game.component.scss']
})
export class MinesweeperGameComponent implements OnInit {

  @Input() gameState: MineSweeperGameState | undefined;

  constructor() {}

  ngOnInit(): void {
  }

  onCellSelect(event: any, cell: MineSweeperCell): void {
    if (event.which == 1)
    {
      this.gameState?.trySelectCell(cell);
    }
  }

  onContextMenu(event: any, cell: MineSweeperCell): boolean {
    if (event.which == 3) {
      this.gameState?.tryMarkCell(cell);
    }

    // suppress right click action
    return false;
  }   
}
