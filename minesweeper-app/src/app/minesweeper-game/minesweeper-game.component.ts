import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MineSweeperCell } from '../interface/MineSweeperCell';
import { MINESWEEPER_GAME_COMPLETION_STATES } from '../interface/MineSweeperConstants';
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

      // check the game state afterwards
      if (this.gameState?.gameCompletionState === MINESWEEPER_GAME_COMPLETION_STATES.completed) {
        console.log('you won');
      }
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
