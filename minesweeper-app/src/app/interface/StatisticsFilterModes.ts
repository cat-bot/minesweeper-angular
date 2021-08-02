import { MINESWEEPER_GRID_SIZES } from "./MineSweeperConstants";

export const STATISTICS_FILTER_MODES: string[] = (() => { 
    let filters = ["all"];

    MINESWEEPER_GRID_SIZES.forEach((s) => {
        filters.push(s.label);
    });

    return filters;
})();
    