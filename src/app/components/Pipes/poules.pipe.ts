import { Pipe, PipeTransform } from '@angular/core';
import { PouleGame } from '../../core/models/Game';
import { PouleInfo } from '../../view/viewmodels/PouleInfo';

@Pipe({
  name: 'poules'
})
export class PoulesPipe implements PipeTransform {
  transform(games: PouleGame[], args?: any): PouleInfo[] {
    if (!games) return null;
    const poules: PouleInfo[] = [];

    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const index = game.poule.charCodeAt(0) - 65;

      if (!poules[index]) {
        
        poules[index] = { letter: game.poule, games: [] };
      }

      poules[index].games.push({
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
        done: game.status > 0
      });
    }

    return poules;
  }
}
