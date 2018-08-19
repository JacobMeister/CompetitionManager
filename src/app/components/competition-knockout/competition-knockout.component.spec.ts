import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { CompetitionKnockoutComponent } from './competition-knockout.component';
import { RoundsPipe } from '../Pipes/rounds.pipe';
import { KnockoutComponent } from '../../view/knockout/knockout.component';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { GameServiceMock } from '../../mocks/game-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';

describe('CompetitionKnockoutComponent', () => {
  let component: CompetitionKnockoutComponent;
  let fixture: ComponentFixture<CompetitionKnockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot(), DragulaModule],
      declarations: [CompetitionKnockoutComponent, RoundsPipe, KnockoutComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        { provide: GameService, useClass: GameServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        DragulaService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionKnockoutComponent);
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
