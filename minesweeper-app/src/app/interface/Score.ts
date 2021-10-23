export class Score {
    public game: string;
    public gamealias: string;
    public gametype: string;
    public name: string;
    public uid: string;

    public time: number;
    public start: firebase.default.firestore.Timestamp | undefined;
    public stop: firebase.default.firestore.Timestamp | undefined;

    // not part of the stored data. 
    // this is the firebase document id
    public docid: string | undefined;

    // for paging
    public pagerankid: number | undefined;

    constructor(
        gametype: string, 
        name: string, 
        uid: string, 
        time: number, 
        start: firebase.default.firestore.Timestamp | undefined,
        stop: firebase.default.firestore.Timestamp | undefined) 
    {
        this.game = "minesweeper";
        this.gamealias = "&#625;";
        this.gametype = gametype;
        this.name = name;
        this.uid = uid;
        this.time = time;
        this.start = start;
        this.stop = stop;
    }
}

export class ScoreConverter {
    toFirestore(score: Score)  {
        // note - do not store the doc id...
        return {
            game: score.game,
            gamealias: score.gamealias,
            gametype: score.gametype,
            name: score.name,
            uid: score.uid,
            time: score.time

            // no need to set the time stamp fields - these are done in separate updates
          };
    }

    fromFirestore(snapshot: firebase.default.firestore.QueryDocumentSnapshot, options?: firebase.default.firestore.SnapshotOptions){
        const data = snapshot.data(options);
        let score = new Score(data.gametype, data.name, data.uid, data.time, data.start, data.stop);
        
        // surface the document id
        score.docid = snapshot.id;
        return score;
    }
}