import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { StatisticsDataPage } from '../interface/StatisticsDataPage';
import { StatisticsService } from '../statistics.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { STATISTICS_FILTER_MODES } from '../interface/StatisticsFilterModes';

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

  // for scrolling to..
  scrollToId: string | undefined;

  filterValues: string[] = STATISTICS_FILTER_MODES;
  selectedFilterValue: string; 

  constructor(
    private route: ActivatedRoute, 
    public statisticsService: StatisticsService, 
    public authService: AuthenticationService) { 
    this.pageSize = 10;
    this.currentRecordIndex = 0;

    // default to 'all' filter
    this.selectedFilterValue = this.filterValues[0];
  }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(p => {
      let filterValue = p.get('f') || this.filterValues[0];

      // reset the filter
      if (this.filterValues.indexOf(filterValue) != -1) {
        this.selectedFilterValue = filterValue;
      }

      // reset the current paging index
      this.currentRecordIndex = 0;

      // initialise at time = 0...
      this.getStats(0);
    }); 
    
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToId = fragment;
      }
    });
  }

  getStats(startAt: number): void {
    // 'all' is a cosmetic nicety, not an actual gametype, so exclude from the query...
    let queryFilterValue = this.selectedFilterValue === "all" ? "" : this.selectedFilterValue;

    this.statisticsService.getPagedStats(startAt, this.pageSize, queryFilterValue)
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
