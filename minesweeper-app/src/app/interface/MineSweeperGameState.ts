import { environment } from "src/environments/environment";
import { MineSweeperCell } from "./MineSweeperCell";
import { MINESWEEPER_GAME_COMPLETION_STATES } from "./MineSweeperConstants";
import { MineSweeperGeneratedGrid } from "./MineSweeperGeneratedGrid";
import { MineSweeperGridSize } from "./MineSweeperGridSize";

export class MineSweeperGameState {

    gridSize: MineSweeperGridSize;
    grid: MineSweeperGeneratedGrid;

    // game state
    gameCompletionState: MINESWEEPER_GAME_COMPLETION_STATES;
    gameIsEnabled: boolean;

    // game time
    gameStartTime: number | undefined;
    gameEndTime: number | undefined;
    gameElpasedTime: number | undefined;

    // win condition tracking
    totalCellCountRequiredToWin: number;
    cellsCleared: number;

    constructor(gridSize: MineSweeperGridSize, mineSweeperGrid: MineSweeperGeneratedGrid){

        this.gridSize = gridSize;
        this.grid = mineSweeperGrid;

        // default to new & enabled
        this.gameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.new;
        this.gameIsEnabled = true;

        // how many cell reveals to win?
        this.totalCellCountRequiredToWin =  gridSize.width*gridSize.height - gridSize.mines;
        this.cellsCleared = 0;
    };

    private logToConsole(logMessage: string) {
        if (!environment.production) {
            console.log(logMessage);
        }
    }

    public ensureGameStarted() {
        if (this.gameCompletionState === MINESWEEPER_GAME_COMPLETION_STATES.new) {
            // record millis start time
            this.gameStartTime = Date.now();
            this.gameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.started;
        }
    }

    public ensureGameStopped(stopState: MINESWEEPER_GAME_COMPLETION_STATES) {
        if (this.gameCompletionState === MINESWEEPER_GAME_COMPLETION_STATES.started) {
            this.gameCompletionState = stopState;          
            this.gameIsEnabled = false;

            // record millis end time
            this.gameEndTime = Date.now();
            this.gameElpasedTime = this.gameStartTime ? this.gameEndTime - this.gameStartTime : 0;
        }
    }

    public tryMarkCell(cell: MineSweeperCell): void {
        if (this.gameIsEnabled) {   
            // make sure timer is started     
            this.ensureGameStarted(); 

            this.logToConsole(`mark cell ${cell.toString()}`);
            cell.tryMarkCell();
        }
        else {
            console.log(`game stopped: ${this.gameCompletionState}`);
        }
    }

    public trySelectCell(cell: MineSweeperCell) : void {
        if (this.gameIsEnabled) {
            // make sure timer is started
            this.ensureGameStarted();
            this.logToConsole(`select cell ${cell.toString()}`);
            
            // first, check if already revealed
            if (cell.isRevealed) {
                // do nothing
                this.logToConsole(`cell already revealed`);
                return;
            }

            // otherwise reveal the cell
            let revealWasSuccess = cell.selectCell();

            if (revealWasSuccess) {
                // cleared one
                this.cellsCleared++;

                // check if player has won
                if (this.cellsCleared === this.totalCellCountRequiredToWin) {
                    this.triggerGameWin();
                    this.logToConsole(`game won in ${this.gameElpasedTime} millis`);
                    return;
                }
            }
            else {
                // hit a mine, stop the game
                this.triggerGameLoss();
                this.logToConsole(`game failed in ${this.gameElpasedTime} millis`);

                return;
            }

            // otherwise, cell is not a mine, player has not yet won, so attempt to autofill if the cell is blank
            if (cell.adjacentMineCount == 0) 
            {
                this.attemptAutoFill(cell);
            }
        }
        else {
            this.logToConsole(`game stopped: ${this.gameCompletionState}`);
        }
    }  
 
    private attemptAutoFill(cell: MineSweeperCell) : void {
        let autoFills = this.grid.getAdjacentNonMineNonRevealedCells(cell);

        for(let i = 0; i < autoFills.length; i++) {
            this.trySelectCell(autoFills[i]);
        }
    }

    private triggerGameLoss() : void {
        this.ensureGameStopped(MINESWEEPER_GAME_COMPLETION_STATES.failed);
        this.grid.revealAllMines();
    }

    private triggerGameWin(): void {
        this.ensureGameStopped(MINESWEEPER_GAME_COMPLETION_STATES.completed);
        this.grid.revealAllMines();       
    }
}