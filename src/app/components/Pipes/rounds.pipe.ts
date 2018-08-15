import { Pipe, PipeTransform } from '@angular/core';
import Game, { GameStatus } from '../../core/models/Game';
import { GameInfo } from '../../view/viewmodels/GameInfo';

@Pipe({
  name: 'rounds'
})
export class RoundsPipe implements PipeTransform {
  transform(value: Game[], args?: any): [GameInfo[]] {
    if (!value) return null;
    const rounds: [GameInfo[]] = [[]];
    for (let i = 0; i < value.length; i++) {
      const game = value[i];
      const index = game.round - 1;

      if (!rounds[index]) {
        rounds[index] = [];
      }

      rounds[index].push({
        player1: {
          name: game.player1.name,
          score: game.score1,
          winner: game.winner === 1
        },
        player2: {
          name: game.player2.name,
          score: game.score2,
          winner: game.winner === 2
        },
        done: game.status === GameStatus.FINISHED
      });
    }

    return rounds;
  }
}
