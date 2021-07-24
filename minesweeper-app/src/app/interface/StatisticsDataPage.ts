import { Score } from "./Score";

export class StatisticsDataPage {

    public data: Score[];
    public startAt: number;
    public hasPrev: boolean;
    public prevStartAt: number | undefined;
    public hasNext: boolean;
    public nextStartAt: number | undefined;

    constructor(data: Score[], startAt: number, hasPrev: boolean, prevStartAt: number | undefined, hasNext: boolean, nextStartAt: number | undefined) {
        this.data = data;
        this.startAt = startAt;
        this.hasPrev = hasPrev;
        this.prevStartAt = prevStartAt;
        this.hasNext = hasNext;
        this.nextStartAt = nextStartAt;
    }
}