import { Component, OnInit } from '@angular/core';
import { StatisticsDataPage } from '../interface/StatisticsDataPage';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  pageStart: number;
  pageSize: number;
  statistics: StatisticsDataPage | undefined;

  constructor(public statisticsService: StatisticsService) { 
    this.pageStart = 0;
    this.pageSize = 10;
  }

  ngOnInit(): void {
    // start at index 0...
    this.getStats(this.pageStart, this.pageSize);
  }

  getStats(startAt: number, n: number): void {
    this.statisticsService.getScores(startAt, n).then((data) => {
      if (data === undefined)
        return;

      // record where we are at for next paging
      this.pageStart = data.startAt;

      // SOME BS HACK FOR NOW
      // cosmetic index for display
      let startIndex = data.startAt;
      data.data.forEach((value) => {
        startIndex++;
        value.uid = "" + startIndex;
      }); 

      this.statistics = data;     
    });
  }

  getNext(): void {
    if (this.statistics?.hasNext) {
      this.getStats(this.pageStart + this.pageSize, this.pageSize);
    }
  }

  getPrev(): void {
    if (this.statistics?.hasPrev) {
      this.getStats(this.pageStart - this.pageSize, this.pageSize);
    }
  }
}
