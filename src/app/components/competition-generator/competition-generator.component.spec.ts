/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionGeneratorComponent } from './competition-generator.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionService } from '../../core/services/competition.service';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import Competition from '../../core/models/Competition';
import { Observable } from 'rxjs/Observable';

describe('CompetitionGamesGeneratorComponent', () => {
  let component: CompetitionGeneratorComponent;
  let fixture: ComponentFixture<CompetitionGeneratorComponent>;

  beforeEach(async(() => {
    const days = 10;
    //const dateHelper = new DateHelper();
    const date = new Date();
    date.setDate(date.getDate() + days);

    const competition: Competition = {
      id: 'Competition ID',
      name: 'Competition',
      owner: { uid: '123456789', name: 'owner' },
      type: 0,
      status: 0,
      games: {},
      durationGame: 90,
      maxParticipants: 8,
      participants: {},
      startDate: dateHelper.formatDate(date),
      simultaneousGames: 2
    };

    const data = { competition: competition };

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [CompetitionGeneratorComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/DWohKT5IJGr2qZpi0DGY' },
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
    fixture = TestBed.createComponent(CompetitionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct competition', () => {
    const days = 10;
    const dateHelper = new DateHelper();
    const date = new Date();
    date.setDate(date.getDate() + days);

    expect(component.competition).toEqual({
      id: 'Competition ID',
      name: 'Competition',
      owner: { uid: '123456789', name: 'owner' },
      type: 0,
      status: 0,
      games: {},
      durationGame: 90,
      maxParticipants: 8,
      participants: {},
      startDate: dateHelper.formatDate(date),
      simultaneousGames: 2
    });
  });

  it('should validate with errors', () => {
    expect(component.errors.length).toEqual(0);
    component.competition.startDate = '2018-06-16';
    component.competition.startTimeDay = 1000000;
    component.competition.endTimeDay = 2000000;
    component.validate();
    expect(component.errors.length).toEqual(2);
    expect(component.errors.indexOf('Start date is in the past.') !== -1).toBe(true);
    expect(component.errors.indexOf('Select at least 2 players.') !== -1).toBe(true);
  });

  it('should validate', () => {
    const participants = {};
    participants['ID1'] = {
      uid: 'UID1',
      name: 'NAME1'
    };
    participants['ID2'] = { uid: 'UID2', name: 'NAME2' };

    expect(component.errors.length).toEqual(0);
    component.competition.participants = participants;
    component.validate();
    expect(component.errors.length).toEqual(0);
  });
});*/
