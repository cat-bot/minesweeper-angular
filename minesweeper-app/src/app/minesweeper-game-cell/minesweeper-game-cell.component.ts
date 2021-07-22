import { Component, Input, OnInit } from '@angular/core';
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

  // ui
  cellGlyph:string = "";
  cellClass:string = "";

  constructor() { }

  ngOnInit(): void {
    this.setCellGlyph();
    this.setCellClass();
  }

  // public getAdjacentMineCount(): number {
  //     return this.adjacentMineCount;
  // }

  // public getIsMine(): boolean {
  //     return this.isMine;
  // }

  // public getIsLosingMine(): boolean {
  //     return this.isLosingMine;
  // }

  // public getIsRevealed(): boolean {
  //     return this.isRevealed;
  // } 

  // public getIsMarked(): boolean {
  //     return this.isMarked;
  // } 

  // public incrementAdjacentMineCount() {
  //     // if (this._game.GameIsPlayable)
  //     this.adjacentMineCount++;
  //     this.setCellGlyph();
  //     this.setCellClass();
  // }

  // public setIsMine() {
  //    // if (this._game.GameIsPlayable)
  //   this.isMine = true;
  //   this.setCellGlyph();
  //   this.setCellClass();
  // }

  public setIsLosingMine() {
    if (this.mineCell) {
      this.mineCell.isLosingMine = true;
      this.setCellGlyph();
      this.setCellClass();
    }
  }

  public setIsRevealed() {
    if (this.mineCell) {
      this.mineCell.isRevealed = true;
      this.mineCell.isMarked = false;
      this.setCellGlyph();
      this.setCellClass();
    }
  }  

  public setIsMarked() {
    if (this.mineCell) {
      this.mineCell.isMarked = true;
      this.setCellGlyph();
      this.setCellClass();
    }
  } 

  // private

  private setCellGlyph(): void {
    if (this.mineCell) {
      this.cellGlyph = this.mineCell.isRevealed ? (this.mineCell.isMine ? "💣" : (this.mineCell.adjacentMineCount > 0 ? `${this.mineCell.adjacentMineCount}` : "")) : "";
    }
  }

  private setCellClass(): void {
    this.cellClass = this.getCellClass();
  }

  private getCellClass(): string {
    if (this.mineCell) {
      if (!this.mineCell.isRevealed) 
      {
          if (this.mineCell.isMarked)
              return "hidden marked";

          return "hidden";
      }

      if (this.mineCell.isMine) {
          return this.mineCell.isLosingMine ? "mine triggered" : "mine ";
      }
          
      if (this.mineCell.adjacentMineCount > 0) 
          return `open-${this.mineCell.adjacentMineCount}`;
      
      return "clear";
    }

    return "";
  }
}
