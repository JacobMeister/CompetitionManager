import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionDetailComponent } from './competition-detail.component';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';
import { CompetitionTournamentComponent } from '../competition-tournament/competition-tournament.component';

import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import Competition from '../../core/models/Competition';
import { KeysPipe } from '../../core/pipes/keys.pipe';
import { RoundsPipe } from '../Pipes/rounds.pipe';
import { CompetitionKnockoutComponent } from '../competition-knockout/competition-knockout.component';
import { CompetitionPouleComponent } from '../competition-poule/competition-poule.component';
import { GameFormComponent } from '../game-form/game-form.component';
import { GameListComponent } from '../game-list/game-list.component';
import { GamestatusPipe } from '../pipes/gamestatus.pipe';
import { PoulesPipe } from '../Pipes/poules.pipe';
import { TournamentComponent } from '../../view/tournament/tournament.component';
import { PouleComponent } from '../../view/poule/poule.component';
import { KnockoutComponent } from '../../view/knockout/knockout.component';
import { Observable } from 'rxjs/Observable';
import { CompetitionService } from '../../core/services/competition.service';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';
import { AuthServiceMock } from '../../mocks/auth-service-mock';


describe('CompetitionDetailComponent', () => {
  let component: CompetitionDetailComponent;
  let fixture: ComponentFixture<CompetitionDetailComponent>;

  beforeEach(async(() => {
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

    const data = {
      competition: competition
    };

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        DragulaModule,
      ],
      declarations: [
        CompetitionDetailComponent,
        CompetitionFormComponent,
        KeysPipe,
        RoundsPipe,
        CompetitionKnockoutComponent,
        CompetitionPouleComponent,
        CompetitionTournamentComponent,
        GameFormComponent,
        GameListComponent,
        GamestatusPipe,
        PoulesPipe,
        TournamentComponent,
        PouleComponent,
        KnockoutComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        {
          provide: ActivatedRoute,
          useValue: { data: Observable.of(data) }
        },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: GameService, useClass: GameServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailComponent);
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct competition', () => {
    expect(component.competition).toEqual({
      id: 'id',
      name: 'competitie',
      owner: { uid: '1', name: 'owner' },
      type: 0,
      status: 0,
      games: {},
      maxParticipants: 8,
      participants: {},
      simultaneousGames: 2
    });
  });

  it('should have the correct logged in user', done => {
    component.currentUser.subscribe(user => {
      expect(user).toEqual({
        uid: 'uid',
        name: 'name',
        email: 'e-mail',
        competitions: {},
        games: {},
        ownedCompetitions: {}
      });
      done();
    });
  });

  it('should have 10 available users to add as player', () => {
    expect(component.users.length).toEqual(10);
  });

  it('should have 5 participants', () => {
    expect(component.participants.length).toEqual(5);
  });
});
