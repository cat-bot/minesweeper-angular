export class MineSweeperCell {

    // internal state
    adjacentMineCount: number;
    isMine: boolean;
    isLosingMine: boolean;
    isRevealed: boolean;
    isMarked: boolean;
    i: number;
    j: number;

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

    /*
        Sets the cell as user-marked, if it hasn't already been revealed.
    */
    tryMarkCell() {
        if (!this.isRevealed && !this.isLosingMine) {
            // not a losing cell, or already revealed, so toggle its marked state
            this.isMarked = !this.isMarked;
        }
    }

    /*
        Returns :
            true if successful selection.
            false if hit a mine.
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
        return this.isRevealed ? (this.isMine ? "💣" : (this.adjacentMineCount > 0 ? `${this.adjacentMineCount}` : "")) : "";
    }

    getCellClass(): string {
        if (!this.isRevealed) 
        {
            if (this.isMarked)
                return "hidden marked";

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