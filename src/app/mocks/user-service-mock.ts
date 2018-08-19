import { Observable } from "rxjs/Observable";
import User from "../core/models/User";

export class UserServiceMock {
    private users$: Observable<User[]>;
  
    public get users(): Observable<User[]> {
      this.users$ = new Observable<User[]>(observer => {
        const usersList: User[] = [];
  
        for (let i = 0; i < 15; i++) {
          const user: User = {
            uid: 'uid' + i,
            name: 'name',
            email: 'e-mail',
            competitions: {},
            games: {},
            ownedCompetitions: {}
          };
  
          usersList.push(user);
        }
  
        observer.next(usersList);
        observer.complete();
      });
  
      return this.users$;
    }
  
    public getParticipantsForCompetition(competitionId: string): Observable<User[]> {
      return new Observable<User[]>(observer => {
        const userList: User[] = [];
  
        for (let i = 0; i < 5; i++) {
          const user: User = {
            uid: 'uid' + i,
            name: 'name',
            email: 'e-mail',
            competitions: {},
            games: {},
            ownedCompetitions: {}
          };
  
          userList.push(user);
        }
  
        observer.next(userList);
        observer.complete();
      });
    }
  }
  
  