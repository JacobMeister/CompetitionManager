import { BehaviorSubject } from "rxjs/BehaviorSubject";
import User from "../core/models/User";
import { Observable } from "rxjs/Observable";

export class AuthServiceMock {
    private user$: BehaviorSubject<User>;
  
    public get user(): Observable<User> {
      this.user$ = new BehaviorSubject<User>(null);
  
      const user: User = {
        uid: 'uid',
        name: 'name',
        email: 'e-mail',
        competitions: {},
        games: {},
        ownedCompetitions: {}
      };
  
      this.user$.next(Object.assign({}, user));
      return this.user$.asObservable();
    }
  }
  
  
  