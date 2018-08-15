import { Component, OnInit, Input } from '@angular/core';
import Competition from '../../core/models/Competition';
import { TournamentGame } from '../../core/models/Game';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-competition-tournament',
  templateUrl: './competition-tournament.component.html',
  styleUrls: ['./competition-tournament.component.scss']
})
export class CompetitionTournamentComponent implements OnInit {
  @Input() public competition: Competition;
  @Input() public games: TournamentGame[];

  constructor(private gs: GameService) {}

  ngOnInit() {}
}
