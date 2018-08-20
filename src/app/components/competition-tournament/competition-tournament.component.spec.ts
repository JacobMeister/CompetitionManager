import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTournamentComponent } from './competition-tournament.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundsPipe } from '../Pipes/rounds.pipe';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { TournamentComponent } from '../../view/tournament/tournament.component';
import { GameService } from '../../core/services/game.service';

describe('CompetitionTournamentComponent', () => {
  let component: CompetitionTournamentComponent;
  let fixture: ComponentFixture<CompetitionTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [CompetitionTournamentComponent, RoundsPipe, TournamentComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        { provide: GameService, useClass: GameServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionTournamentComponent);
    component = fixture.componentInstance;

    const competition = {
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

    component.competition = competition;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
