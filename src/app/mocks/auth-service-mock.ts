import { BehaviorSubject } from "rxjs/BehaviorSubject";
import User from "../core/models/User";
import { Observable } from "rxjs/Observable";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import Competition from "../core/models/Competition";

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
  
  export class CompetitionResolverServiceMock implements Resolve<Competition> {
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Competition | Observable<Competition> | Promise<Competition> {
      return new Observable<Competition>(observer => {
        const competition: Competition = {
          id: 'ID',
          name: 'Competition',
          owner: { uid: '123456789', name: 'owner' },
          type: 0,
          status: 0,
          games: {},
          durationGame: 90,
          maxParticipants: 8,
          participants: {},
          startDate: '2018-08-18',
          simultaneousGames: 2
        };
        observer.next(competition);
        observer.complete();
      });
    }
  }
  