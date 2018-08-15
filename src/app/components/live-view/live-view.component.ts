import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable, Subscription } from 'rxjs';
import Competition, { CompetitionType } from '../../core/models/Competition';
import Game from '../../core/models/Game';
import { CompetitionService } from '../../core/services/competition.service';
import { GameService } from '../../core/services/game.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit, OnDestroy {
  $competition: Observable<Competition>;
  $games: Observable<Game[]>;
  private subscription: Subscription;
  private updatedAt: Date;
  private timer: any;
  updateText: string;
  competitionType = CompetitionType;

  constructor(private route: ActivatedRoute, private cs: CompetitionService, private gs: GameService) {}

  ngOnInit() {
    this.$competition = this.route.paramMap.switchMap((params: ParamMap) => this.cs.getCompetition(params.get('id')));
    this.$games = this.route.paramMap.switchMap((params: ParamMap) =>
      this.gs.getAllGamesForCompetition(params.get('id'))
    );
    this.subscription = this.$games.subscribe(() => {
      this.updatedAt = new Date();
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => this.recalculateUpdateText(), 500);
      this.recalculateUpdateText();
    });
  }

  recalculateUpdateText() {
    this.updateText = moment(this.updatedAt).fromNow();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timer) clearInterval(this.timer);
  }
}
