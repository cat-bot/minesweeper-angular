import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication.service";
import { StatisticsService } from "../statistics.service";
import { MineSweeperCell } from "./MineSweeperCell";
import { MINESWEEPER_GAME_COMPLETION_STATES } from "./MineSweeperConstants";
import { MineSweeperGeneratedGrid } from "./MineSweeperGeneratedGrid";
import { MineSweeperGridSize } from "./MineSweeperGridSize";
import { Score } from "./Score";

export class MineSweeperGameState {

    gridSize: MineSweeperGridSize;
    grid: MineSweeperGeneratedGrid;
    statsService: StatisticsService;
    authService: AuthenticationService;

    // game state
    gameCompletionState: MINESWEEPER_GAME_COMPLETION_STATES;
    gameIsEnabled: boolean;

    // game time
    gameStartTime: number | undefined;
    gameEndTime: number | undefined;
    gameElapsedTime: number | undefined;

    // win condition tracking
    totalCellCountRequiredToWin: number;
    cellsCleared: number;
    wonByAutoWin: boolean;
    storedWinRecordId: string | undefined;

    // for tracking marked cells
    cellsRemaining: number;
    allCells: MineSweeperCell[] = [];

    constructor(
        gridSize: MineSweeperGridSize, 
        mineSweeperGrid: MineSweeperGeneratedGrid,
        statsService: StatisticsService,
        authService: AuthenticationService){

        this.gridSize = gridSize;
        this.grid = mineSweeperGrid;
        this.statsService = statsService;
        this.authService = authService;

        // default to new & enabled
        this.gameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.new;
        this.gameIsEnabled = true;

        // flag only matters when game is won, so default to false
        this.wonByAutoWin = false;

        // how many cell reveals to win?
        this.totalCellCountRequiredToWin =  gridSize.width*gridSize.height - gridSize.mines;
        this.cellsCleared = 0;

        // how many remain to mark
        this.cellsRemaining = gridSize.mines;

        // flatten the grid into an array
        for (let i = 0; i < this.grid.grid.length; i++) {
            let row = this.grid.grid[i];
            for (let j = 0; j < row.length; j++) {
                this.allCells.push(row[j]);
            }
        }
    };

    public getMarkedCells() : MineSweeperCell[] {
        return this.allCells.filter((cell) => { return cell.isMarked });
    }

    // PUBLIC

    public tryMarkCell(cell: MineSweeperCell): void {
        if (this.gameIsEnabled) {   
            // make sure timer is started     
            this.ensureGameStarted(); 
            this.logToConsole(`mark cell ${cell.toString()}`);

            // check cell state before and after
            cell.tryMarkCell();
            let markedCellCount = this.getMarkedCells().length;

            // recalc cellsRemaining
            this.cellsRemaining = this.gridSize.mines - markedCellCount;
        }
        else {
            this.logToConsole(`game stopped: ${this.gameCompletionState}`);
        }
    }

    public trySelectCell(cell: MineSweeperCell) : void {
        if (this.gameIsEnabled) {
            // make sure timer is started
            this.ensureGameStarted();
            this.logToConsole(`select cell ${cell.toString()}`);

            if (cell.isMarked) {
                // do nothing - the original minesweeper wouldnt let you select marked cells
                return;
            }
            
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
                    this.setGameWon();
                    this.logToConsole(`game won in ${this.gameElapsedTime} millis`);
                    return;
                }
            }
            else {
                // hit a mine, stop the game
                this.setGameLost();
                this.logToConsole(`game failed in ${this.gameElapsedTime} millis`);

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
 
    // PRIVATE

    private logToConsole(logMessage: string) {
        if (!environment.production) {
            console.log(logMessage);
        }
    }

    private ensureGameStarted() {
        if (this.gameCompletionState === MINESWEEPER_GAME_COMPLETION_STATES.new) {
            // record millis start time
            this.gameStartTime = Date.now();
            this.gameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.started;
        }
    }

    private ensureGameStopped(stopState: MINESWEEPER_GAME_COMPLETION_STATES) {
        if (this.gameCompletionState === MINESWEEPER_GAME_COMPLETION_STATES.started) {
            this.gameCompletionState = stopState;          
            this.gameIsEnabled = false;

            // record millis end time
            this.gameEndTime = Date.now();
            this.gameElapsedTime = this.gameStartTime ? this.gameEndTime - this.gameStartTime : 0;
        }
    }

    private attemptAutoFill(cell: MineSweeperCell) : void {
        let autoFills = this.grid.getAdjacentNonMineNonRevealedCells(cell);

        for(let i = 0; i < autoFills.length; i++) {
            this.trySelectCell(autoFills[i]);
        }
    }

    private setGameLost() : void {
        this.ensureGameStopped(MINESWEEPER_GAME_COMPLETION_STATES.failed);
        this.revealRelevantCellsOnLoss();
    }

    private revealRelevantCellsOnLoss() {
        /*
            on hitting a mine, the original game would:
            `   1 - reveal the hit mine, highlighted red (already done by cell.trySelectCell())                     
        */
        for(let i = 0; i < this.grid.mines.length; i++) {
            let mine = this.grid.mines[i];
            
            // 2 - reveal other mines that were not marked
            if (!mine.isRevealed && !mine.isMarked) {
                mine.reveal();
            }
        }

        // 3 - set all marked cells that arent mines to incorrectly flagged
        let incorrectlyMarkedCells = this.getMarkedCells().filter((cell) => { return !cell.isMine; });
        incorrectlyMarkedCells.forEach((cell) => { cell.setIsIncorrectlyMarked() });

        // 4 - leave the marked symbol where it was correctly a mine ...
    }

    private setGameWon(): void {
        this.ensureGameStopped(MINESWEEPER_GAME_COMPLETION_STATES.completed);

        if (!this.wonByAutoWin) {
            let user = this.authService.getCurrentUser();

            if (user) {
                let score = new Score(
                    this.gridSize.label, 
                    user.displayName + "", 
                    user.uid, 
                    this.gameElapsedTime ? this.gameElapsedTime : NaN);

                this.statsService.addScore(score).then((doc) => {
                    this.storedWinRecordId = doc.id;
                });
            }
        }
    }
}