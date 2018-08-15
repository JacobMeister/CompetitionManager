import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Game, { GameStatus } from '../../core/models/Game';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  @Input() game: Game;
  @Output() save: EventEmitter<Game>;
  @Output() cancel: EventEmitter<any>;
  copy: Game;
  errors: string[];
  showTimePickerStart: boolean;
  showTimePickerEnd: boolean;
  gameStatus = GameStatus;

  constructor() {
    this.showTimePickerStart = false;
    this.showTimePickerEnd = false;
    this.save = new EventEmitter<Game>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.copy = Object.assign({}, this.game);
  }

  onPickStartDate(date: Date) {
    this.copy.start = date;
    this.showTimePickerStart = false;
  }

  onPickEndDate(date: Date) {
    this.copy.end = date;
    this.showTimePickerEnd = false;
  }
}
