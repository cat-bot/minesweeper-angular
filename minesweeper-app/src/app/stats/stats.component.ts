import { Component, OnInit } from '@angular/core';
import { StatisticsDataPage } from '../interface/StatisticsDataPage';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  pageSize: number;
  statistics: StatisticsDataPage | undefined;

  // for tracking a cosmetic index per record
  currentRecordIndex: number;

  constructor(public statisticsService: StatisticsService) { 
    this.pageSize = 10;
    this.currentRecordIndex = 0;
  }

  ngOnInit(): void {
    // initialise at time = 0...
    this.getStats(0);
  }

  getStats(startAt: number): void {
    this.statisticsService.getPagedStats(startAt, this.pageSize)
      .then((data) => {
        // cosmetic index for display
        data.data.forEach((value) => {
          this.currentRecordIndex++;
          value.pagerankid = this.currentRecordIndex;
        }); 

        this.statistics = data;     
      });
  }

  getNext(): void {
    if (this.statistics?.hasNext) {
      this.statisticsService.getNextPage(this.statistics)
        .then((data) => {
          // cosmetic index for display
          data.data.forEach((value) => {
            this.currentRecordIndex++;
            value.pagerankid = this.currentRecordIndex;
          }); 

          this.statistics = data;     
        });
    }
  }

  getPrev(): void {
    if (this.statistics?.hasPrev) {
      // first reset index for the current displayed data size
      this.currentRecordIndex = this.currentRecordIndex - this.statistics.data.length;

      this.statisticsService.getPreviousPage(this.statistics)
        .then((data) => {
          // further reset index by the page size to count forward
          this.currentRecordIndex = this.currentRecordIndex - data.data.length;
          data.data.forEach((value) => {
            this.currentRecordIndex++;
            value.pagerankid = this.currentRecordIndex;
          }); 

          this.statistics = data;     
        });
    }
  }
}
