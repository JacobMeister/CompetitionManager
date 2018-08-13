import { Pipe, PipeTransform } from '@angular/core';
import { CompetitionStatus } from '../../core/models/Competition';

@Pipe({
  name: 'competitionstatus'
})
export class CompetitionstatusPipe implements PipeTransform {
  transform(value: CompetitionStatus, args?: any): string {
    switch (value) {
      case CompetitionStatus.FINISHED:
        return 'finished';
      case CompetitionStatus.PLAYING:
        return 'playing';
      case CompetitionStatus.OPEN:
        return 'open';
    }
  }
}
