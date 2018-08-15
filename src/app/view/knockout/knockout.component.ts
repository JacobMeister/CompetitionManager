import { Component, OnInit, Input } from '@angular/core';
import { GameInfo } from '../viewmodels/GameInfo';

@Component({
  selector: 'app-statusdisplay-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class KnockoutComponent implements OnInit {
  @Input() rounds: [GameInfo[]];

  constructor() {}

  ngOnInit() {}
}
