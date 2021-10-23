export class MineSweeperCell {

    // internal state
    adjacentMineCount: number;
    isMine: boolean;
    isLosingMine: boolean;
    isRevealed: boolean;
    isMarked: boolean;
    i: number;
    j: number;

    // for ui concerns, only relevant on loss condition
    cellIncorrectlyMarked: boolean | undefined;

    constructor(i: number, j: number) {
        this.adjacentMineCount = 0;
        this.isMine = false;
        this.isLosingMine = false;
        this.isRevealed = false;
        this.isMarked = false;
        this.i = i;
        this.j = j;
    }
    
    // public state mutators

    /*
        For use by grid generator - sets the cell as being a mine cell.
    */
    setIsMine() {
        this.isMine = true;  
    }

    setIsIncorrectlyMarked() {
        if (!this.isMine && this.isMarked) {
            this.cellIncorrectlyMarked = true;
        }
    }

    /** Sets the cell as user-marked, if it hasn't already been revealed. */
    tryMarkCell() {
        if (!this.isRevealed && !this.isLosingMine) {
            // not a losing cell, or already revealed, so toggle its marked state
            this.isMarked = !this.isMarked;
        }
    }

    /**
    * @returns True if successful selection. False if hit a mine.
    */
    selectCell() : boolean {
        // first, set revealed (but no need for it to be marked any more)
        this.reveal();

        if (this.isMine) {
            // oh ohh, mark this mine as the one hit
            this.isLosingMine = true;
            return false;
        }   
        
        return true;
    }

    reveal() : void {
        this.isRevealed = true;
        this.isMarked = false;
    }

    incrementAdjacentMineCount() {     
      this.adjacentMineCount++;
    }

    getCellGlyph(): string {
        /* 
            the possible content states are:
                hidden (css hidden)
                marked (css hidden, marked)
                marked and incorrrect (css hidden, marked, incorrect)
                revealed adjacent cells (css open-1 ... open-8)
                revealed and a mine (css mine or mine triggered)
                revealed and no mine or adjacent mines

        */
        if (!this.isRevealed) 
        {
            if (this.isMarked) {
                return this.cellIncorrectlyMarked ? "╳" : "!";
            }

            return "";
        }

        if (this.isMine) {
            return "💣";
        }
            
        if (this.adjacentMineCount > 0) 
            return `${this.adjacentMineCount}`;
        
        return "";
    }

    getCellClass(): string {
        if (!this.isRevealed) 
        {
            if (this.isMarked) {
                return this.cellIncorrectlyMarked ? "hidden marked incorrect" : "hidden marked";
            }

            return "hidden";
        }

        if (this.isMine) {
            return this.isLosingMine ? "mine triggered" : "mine ";
        }
            
        if (this.adjacentMineCount > 0) 
            return `open-${this.adjacentMineCount}`;
        
        return "clear";
    }

    // yo
    toString(): string {
        return `i:${this.i},j:${this.j},isMine:${this.isMine}`;
    }
}