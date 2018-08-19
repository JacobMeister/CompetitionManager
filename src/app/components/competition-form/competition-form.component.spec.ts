import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionFormComponent } from './competition-form.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionService } from '../../core/services/competition.service';
import { KeysPipe } from '../../core/pipes/keys.pipe';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { AuthServiceMock } from '../../mocks/auth-service-mock';

describe('CompetitionFormComponent', () => {
  let component: CompetitionFormComponent;
  let fixture: ComponentFixture<CompetitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [CompetitionFormComponent, KeysPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionFormComponent);
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

    component.competition = competition; 
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a correct user', done => {
    expect(component.user.uid).toEqual('uid');
    expect(component.user.name).toEqual('name');
    expect(component.user.email).toEqual('e-mail');
    expect(component.user.competitions).toEqual({});
    expect(component.user.games).toEqual({});
    expect(component.user.ownedCompetitions).toEqual({});
    done();
  });

});
