import { Score } from "./Score";

export class StatisticsDataPage {

    public pageSize: number;
    public data: Score[];

    public startTime: number;
    public endTime: number;

    public hasPrev: boolean;
    public hasNext: boolean;

    constructor(data: Score[], hasPrev: boolean, hasNext: boolean, pageSize: number) {
        this.pageSize = pageSize;
        this.data = data;

        this.hasPrev = hasPrev;
        this.hasNext = hasNext;

        this.startTime = data[0]?.time;
        this.endTime = data[data.length - 1]?.time;
    }
}