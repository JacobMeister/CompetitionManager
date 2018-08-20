import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import Competition from "../core/models/Competition";
import { Observable } from "rxjs";

export class CompetitionResolverServiceMock implements Resolve<Competition> {
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Competition | Observable<Competition> | Promise<Competition> {
      return new Observable<Competition>(observer => {
        const competition: Competition = {
            id: 'id',
            name: 'competitie',
            owner: { uid: '1', name: 'owner' },
            type: 0,
            status: 0,
            games: {},
            maxParticipants: 8,
            participants: {},
            simultaneousGames: 2
        };
        observer.next(competition);
        observer.complete();
      });
    }
  }