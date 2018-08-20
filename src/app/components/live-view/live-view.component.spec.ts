import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewComponent } from './live-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TournamentComponent } from '../../view/tournament/tournament.component';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { GameService } from '../../core/services/game.service';
import { CompetitionService } from '../../core/services/competition.service';
import { PouleComponent } from '../../view/poule/poule.component';
import Competition from '../../core/models/Competition';
import { RoundsPipe } from '../Pipes/rounds.pipe';
import { PoulesPipe } from '../Pipes/poules.pipe';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { KnockoutComponent } from '../../view/knockout/knockout.component';

describe('LiveViewComponent', () => {
  let component: LiveViewComponent;
  let fixture: ComponentFixture<LiveViewComponent>;

  const competition: Competition = {
      id: 'id',
      name: 'competitie',
      owner: { uid: '1', name: 'owner' },
      type: 0,
      status: 0,
      games: {},
      maxParticipants: 8,
      participants: {},
      simultaneousGames: 2
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveViewComponent, TournamentComponent, PouleComponent, KnockoutComponent, RoundsPipe, PoulesPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: Observable.of({ get: (field: string) => competition.id }) }
        },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: GameService, useClass: GameServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
