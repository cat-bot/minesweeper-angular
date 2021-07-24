import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { StatisticsDataPage } from './interface/StatisticsDataPage';
import { Score, ScoreConverter } from './interface/Score';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private angularFireStore: AngularFirestore) { }

  getPagedStats(startTime: number, limit: number) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = limit + 1;

    let query = this.angularFireStore
      .collection(environment.scores_collection).ref
      .orderBy("time")
      .startAt(startTime)
      .limit(k)
      .withConverter(new ScoreConverter())
      .get()
      .then((querySnapshot) => { 
          let results: Score[] = [];
          querySnapshot.forEach((doc) => { results.push(doc.data()); });

          let hasNext = results.length > limit;

          // if the result set length exceeds limit, there's a next page, so pop the one extra entry
          if (hasNext)
              results.pop();
  
          return new StatisticsDataPage(results, false, hasNext, limit);
      },
      (error) => { 
        // just return a blank result set
        console.log(error);
        return new StatisticsDataPage([], false, false, 0); 
      });

      return query;
  } 

  getNextPage(pageCursor: StatisticsDataPage) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = pageCursor.pageSize + 1;

    let query = this.angularFireStore
      .collection(environment.scores_collection).ref
      .orderBy("time")
      .startAfter(pageCursor.endTime)
      .limit(k)
      .withConverter(new ScoreConverter())
      .get()
      .then((querySnapshot) => { 
          let results: Score[] = [];
          querySnapshot.forEach((doc) => { results.push(doc.data()); });

          let hasNext = results.length > pageCursor.pageSize;

          // if the result set length exceeds limit, there's a next page, so pop the one extra entry
          if (hasNext)
              results.pop();

          return new StatisticsDataPage(results, true, hasNext, pageCursor.pageSize);
      },
      (error) => { 
        // just return a blank result set
        console.log(error);
        return new StatisticsDataPage([], false, false, 0); 
      });

      return query;
  }

  getPreviousPage(pageCursor: StatisticsDataPage) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = pageCursor.pageSize + 1;

    let query = this.angularFireStore
      .collection(environment.scores_collection).ref
      .orderBy("time")
      .endBefore(pageCursor.startTime)
      .limitToLast(k)
      .withConverter(new ScoreConverter())
      .get()
      .then((querySnapshot) => { 
          let results: Score[] = [];
          querySnapshot.forEach((doc) => { results.push(doc.data()); });

          let hasPrev = results.length > pageCursor.pageSize;

          // if the result set length exceeds limit, there's a prev page, so pop the first extra entry
          if (hasPrev)
              results.shift();

          return new StatisticsDataPage(results, hasPrev, true, pageCursor.pageSize);
      },
      (error) => { 
        // just return a blank result set
        console.log(error);
        return new StatisticsDataPage([], false, false, 0); 
      });

      return query;
  }

  addScore(score: Score): Promise<DocumentReference<unknown>> {
    return this.angularFireStore
      .collection(environment.scores_collection)
      .add(new ScoreConverter().toFirestore(score));
  }
}
