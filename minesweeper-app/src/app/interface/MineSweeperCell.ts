export class MineSweeperCell {
    constructor() {}

    public adjacentMineCount: number = 0;
    public isMine: boolean = false;
    public isLosingMine: boolean = false;
    public isRevealed: boolean = false;
    public isMarked: boolean = false;
}