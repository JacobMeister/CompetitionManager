import { Pipe, PipeTransform } from '@angular/core';
import { GameStatus } from '../../core/models/Game';

@Pipe({
  name: 'gamestatus'
})
export class GamestatusPipe implements PipeTransform {
  transform(value: GameStatus, args?: any): string {
    switch (value) {
      case GameStatus.FINISHED:
        return 'finished';
      case GameStatus.OPEN:
        return 'open';
    }
  }
}
