export class Score {
    public game: string;
    public gamealias: string;
    public gametype: string;
    public name: string;
    public uid: string;
    public time: number;

    constructor(gametype: string, name: string, uid: string, time: number) {
        this.game = "minesweeper";
        this.gamealias = "&#625;";
        this.gametype = gametype;
        this.name = name;
        this.uid = uid;
        this.time = time;
    }
}

export class ScoreConverter {
    toFirestore(score: Score)  {
        return {
            game: score.game,
            gamealias: score.gamealias,
            gametype: score.gametype,
            name: score.name,
            uid: score.uid,
            time: score.time
          };
    }

    fromFirestore(snapshot: firebase.default.firestore.QueryDocumentSnapshot, options?: firebase.default.firestore.SnapshotOptions){
        const data = snapshot.data(options);
        return new Score(data.gametype, data.name, data.uid, data.time);
    }
}