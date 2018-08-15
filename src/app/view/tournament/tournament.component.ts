import { Component, OnInit, Input } from '@angular/core';
import { GameInfo } from '../viewmodels/GameInfo';

@Component({
  selector: 'app-statusdisplay-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  @Input() rounds: [GameInfo[]];

  constructor() {}

  ngOnInit() {}
}
