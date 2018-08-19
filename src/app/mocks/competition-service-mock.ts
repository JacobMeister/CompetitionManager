import { Observable } from "rxjs/Observable";
import Competition from "../core/models/Competition";
import 'rxjs/add/observable/of';

export class CompetitionServiceMock {
    private competitions$: Observable<Competition[]>;
  
    public getCompetition(id: string): Observable<Competition> {
      return Observable.of({
        id: 'id' ,
            name: 'competitie' ,
            owner: { uid: '1', name: 'owner' },
            type: 0,
            status: 0,
            games: {},
            maxParticipants: 8,
            participants: {},
            simultaneousGames: 2
      });
    }
  
    public get competitions(): Observable<Competition[]> {
      this.competitions$ = new Observable<Competition[]>(observer => {
        const competitionsList: Competition[] = [];
  
        for (let i = 0; i < 10; i++) {
          const competition: Competition = {
            id: 'id' + i,
            name: 'competitie' + i,
            owner: { uid: '1', name: 'owner' },
            type: 0,
            status: 0,
            games: {},
            maxParticipants: 8,
            participants: {},
            simultaneousGames: 2
          };
  
          competitionsList.push(competition);
        }
  
        observer.next(competitionsList);
        observer.complete();
      });
  
      return this.competitions$;
    }
  
    public getCompetitionsForUser(userId: string): Observable<Competition[]> {
      return new Observable<Competition[]>(observer => {
        const competitionsList: Competition[] = [];
  
        for (let i = 0; i < 7; i++) {
          const competition: Competition = {
            id: 'id' + i,
            name: 'competitie' + i,
            owner: { uid: '1', name: 'owner' },
            type: 0,
            status: 0,
            games: {},
            maxParticipants: 8,
            participants: {},
            simultaneousGames: 2
          };
  
          competitionsList.push(competition);
        }
  
        observer.next(competitionsList);
        observer.complete();
      });
    }
  
    public getOwnedCompetitionsForUser(userId: string): Observable<Competition[]> {
      return new Observable<Competition[]>(observer => {
        const competitionsList: Competition[] = [];
  
        for (let i = 0; i < 4; i++) {
          const competition: Competition = {
            id: 'id' + i,
            name: 'competitie' + i,
            owner: { uid: '1', name: 'owner' },
            type: 0,
            status: 0,
            games: {},
            maxParticipants: 8,
            participants: {},
            simultaneousGames: 2
          };
  
          competitionsList.push(competition);
        }
  
        observer.next(competitionsList);
        observer.complete();
      });
    }
  }
  
  