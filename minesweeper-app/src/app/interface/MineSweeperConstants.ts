import { MineSweeperGridSize } from './MineSweeperGridSize';

export const MINESWEEPER_GRID_SIZES: MineSweeperGridSize[] = [
    { width: 9, height: 9, mines: 10, label: "beginner"},
    { width: 16, height: 16, mines: 40, label: "intermediate"},
    { width: 16, height: 26, mines: 80, label: "expert"}
];
    
export const enum MINESWEEPER_GAME_COMPLETION_STATES {
    new,
    started,
    completed,
    failed
};

