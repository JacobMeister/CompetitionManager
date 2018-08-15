import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Game from '../../core/models/Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  @Input() games: Game[];
  @Input() showEditButton: boolean;
  @Output() clickEditGame: EventEmitter<Game>;

  constructor() {
    this.clickEditGame = new EventEmitter<Game>();
    this.showEditButton = false;
  }

  ngOnInit() {}

  onClickEdit(game: Game) {
    this.clickEditGame.emit(game);
  }
}
