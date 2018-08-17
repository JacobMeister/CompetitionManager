import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import Competition from '../models/Competition';
import { CompetitionService } from './competition.service';

@Injectable()
export class ResolverService implements Resolve<Competition> {
  constructor(private cs: CompetitionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Competition> | Promise<Competition> | Competition {
    return new Observable<Competition>(sub => {
      this.cs.getCompetition(route.params.id).subscribe(comp => {
        if (comp) {
          sub.next(comp);
          sub.complete();
        } else {
          sub.error(new Error('not found'));
        }
      });
    });
  }
}
