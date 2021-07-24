import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

import { environment } from '../environments/environment';
import { StatisticsDataPage } from './interface/StatisticsDataPage';
import { Score, ScoreConverter } from './interface/Score';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private angularFireStore: AngularFirestore) { }

  getScores(startAt: number, n: number) : Promise<undefined | StatisticsDataPage> {
    // fetch 1 more than n, to test for paging
    let k = n + 1;
    let db = this.angularFireStore.collection(environment.scores_collection);

    let result = db.ref
      .orderBy("time")
      .startAt(startAt)
      .limit(k)
      .withConverter(new ScoreConverter())
      .get()
      .then((querySnapshot) => { 
          let results: Score[] = [];

          querySnapshot.forEach((doc) => {
              let index = startAt;
              let data = doc.data();
              index++;
              
              results.push(data);
          });

          let hasPrev = startAt != 0;
          let hasNext = results.length > n;

          // if the length, exceeds what we wanted to query, there's a next page, so pop the one extra entry
          if (hasNext)
              results.pop();
  
          return new StatisticsDataPage(results, startAt, hasPrev, hasPrev ? startAt - n : undefined, hasNext, hasNext ? startAt + n : undefined);
      },
      () => {
        return undefined;
      });

      return result;
  } 

  addScore(score: Score): void {
    this.angularFireStore
      .collection(environment.scores_collection)
      .add(new ScoreConverter().toFirestore(score))
      .then(() => {
      });
  }
}
