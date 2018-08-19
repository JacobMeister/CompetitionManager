import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import 'rxjs/add/operator/take';
import { CompetitionPouleComponent } from './competition-poule.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { PouleComponent } from '../../view/poule/poule.component';
import { PoulesPipe } from '../Pipes/poules.pipe';
import { GamestatusPipe } from '../pipes/gamestatus.pipe';
import { GameService } from '../../core/services/game.service';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { UserService } from '../../core/services/user.service';
import { UserServiceMock } from '../../mocks/user-service-mock';
import User from '../../core/models/User';


describe('CompetitionPouleSystemComponent', () => {
  let component: CompetitionPouleComponent;
  let fixture: ComponentFixture<CompetitionPouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot(), DragulaModule],
      declarations: [CompetitionPouleComponent, PouleComponent, PoulesPipe, GamestatusPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        { provide: GameService, useClass: GameServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        DragulaService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPouleComponent);
    component = fixture.componentInstance;

    const competition = {
      id: 'id',
      name: 'competitie',
      owner: { uid: '1', name: 'owner' },
      type: 0,
      status: 0,
      games: {},
      durationGame: 60,
      maxParticipants: 8,
      participants: {},
      startDate: '2020-08-18',
      simultaneousGames: 2
    };

    competition['poules'] = {};
    competition['poules']['A'] = [];
    competition['poules']['B'] = [];

    for (let i = 0; i < 8; i++) {
      const user: User = {
        uid: 'uid' + i,
        name: 'name',
        email: 'e-mail',
        competitions: {},
        games: {},
        ownedCompetitions: {}
      };

      if (i < 4) {
        competition['poules']['A'].push(user);
      } else {
        competition['poules']['B'].push(user);
      }
    }

    component.competition = competition;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
