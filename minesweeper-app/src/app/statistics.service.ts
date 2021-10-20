import * as firebase from "firebase";
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

  getPagedStats(startTime: number, limit: number, typeFilter: string | undefined) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = limit + 1;

    let ref = this.angularFireStore
      .collection(environment.scores_collection).ref;

    let baseQuery = typeFilter 
      ? ref.where("time", "!=", 0).where("gametype", "==", typeFilter).orderBy("time")
      : ref.where("time", "!=", 0).orderBy("time");

    let query = baseQuery
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
  
          return new StatisticsDataPage(results, false, hasNext, limit, typeFilter);
      },
      (error) => { 
        // just return a blank result set
        return new StatisticsDataPage([], false, false, 0, typeFilter); 
      });

      return query;
  } 

  getNextPage(pageCursor: StatisticsDataPage) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = pageCursor.pageSize + 1;

    let ref = this.angularFireStore
      .collection(environment.scores_collection).ref;

    let baseQuery = pageCursor.typeFilter 
      ? ref.where("time", "!=", 0).where("gametype", "==", pageCursor.typeFilter ).orderBy("time")
      : ref.where("time", "!=", 0).orderBy("time");

    let query = baseQuery
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

          return new StatisticsDataPage(results, true, hasNext, pageCursor.pageSize, pageCursor.typeFilter);
      },
      (error) => { 
        // just return a blank result set
        return new StatisticsDataPage([], false, false, 0, pageCursor.typeFilter); 
      });

      return query;
  }

  getPreviousPage(pageCursor: StatisticsDataPage) : Promise<StatisticsDataPage> {
    // fetch 1 more than limit, to test for paging
    let k = pageCursor.pageSize + 1;

    let ref = this.angularFireStore
      .collection(environment.scores_collection).ref;

    let baseQuery = pageCursor.typeFilter 
      ? ref.where("time", "!=", 0).where("gametype", "==", pageCursor.typeFilter ).orderBy("time")
      : ref.where("time", "!=", 0).orderBy("time");

    let query = baseQuery
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

          return new StatisticsDataPage(results, hasPrev, true, pageCursor.pageSize, pageCursor.typeFilter);
      },
      (error) => { 
        // just return a blank result set
        return new StatisticsDataPage([], false, false, 0, pageCursor.typeFilter); 
      });

      return query;
  }

  addScore(score: Score): Promise<DocumentReference<unknown>> {
    return this.angularFireStore
      .collection(environment.scores_collection)
      .add(new ScoreConverter().toFirestore(score));
  }

  deleteScore(recordId: string): Promise<void> {
    return this.angularFireStore
      .collection(environment.scores_collection)
      .doc(recordId)
      .delete();
  }

  ensureStartTime(scoreRecord: DocumentReference<unknown>): Promise<void> {
    return scoreRecord.update({
      start: firebase.default.firestore.FieldValue.serverTimestamp()
    })
  }

  ensureStopTime(recordId: string): Promise<void> {
    return this.angularFireStore
      .collection(environment.scores_collection)
      .doc(recordId)
      .update({
        stop: firebase.default.firestore.FieldValue.serverTimestamp()
      });
  }

  ensureDuration(recordId: string): Promise<void> {
    let duration: number;

    return this.angularFireStore
      .collection(environment.scores_collection)
      .doc(recordId).ref
      .withConverter(new ScoreConverter())
      .get()
      .then((doc) => { 
        let score = doc.data();
        if (score && score.stop && score.start)
        {
          duration = score?.stop?.toMillis() - score?.start?.toMillis();
        }
      })
      .then(() => {
        this.angularFireStore
          .collection(environment.scores_collection)
          .doc(recordId)
          .update({
            time: duration
          });
      });
  }
}
