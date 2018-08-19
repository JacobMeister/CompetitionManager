import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CompetitionGeneratorComponent } from './competition-generator.component';
import Competition from '../../core/models/Competition';
import { CompetitionService } from '../../core/services/competition.service';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';
import { AuthServiceMock } from '../../mocks/auth-service-mock';

describe('CompetitionGeneratorComponent', () => {
  let component: CompetitionGeneratorComponent;
  let fixture: ComponentFixture<CompetitionGeneratorComponent>;

  beforeEach(async(() => {
    const days = 10;
    const date = new Date();
    date.setDate(date.getDate() + days);

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

    const data = { competition: competition };

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [CompetitionGeneratorComponent],
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
    fixture = TestBed.createComponent(CompetitionGeneratorComponent);
    component = fixture.componentInstance;
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

  /*it('should validate', () => {
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
  });*/
});
