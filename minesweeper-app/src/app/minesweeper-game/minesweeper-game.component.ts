import { Component, Input, OnInit } from '@angular/core';
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
  @Input() markOnSelect: boolean | undefined;

  // for enabling component template truthy checks
  COMPLETED: MINESWEEPER_GAME_COMPLETION_STATES = MINESWEEPER_GAME_COMPLETION_STATES.completed;
  FAILED: MINESWEEPER_GAME_COMPLETION_STATES = MINESWEEPER_GAME_COMPLETION_STATES.failed;
  NEW: MINESWEEPER_GAME_COMPLETION_STATES = MINESWEEPER_GAME_COMPLETION_STATES.new;
  STARTED: MINESWEEPER_GAME_COMPLETION_STATES = MINESWEEPER_GAME_COMPLETION_STATES.started;

  constructor() {}

  ngOnInit(): void { }

  onCellSelect(event: any, cell: MineSweeperCell): void {
    if (event.which == 1)
    {
      if (this.markOnSelect)
        this.gameState?.tryMarkCell(cell);        
      else
        this.gameState?.trySelectCell(cell);
    }
  }

  // for desktop specifically
  onContextMenu(event: any, cell: MineSweeperCell): boolean {
    if (event.which == 3) {
      this.gameState?.tryMarkCell(cell);
    }

    // suppress right click action
    return false;
  }   
}
