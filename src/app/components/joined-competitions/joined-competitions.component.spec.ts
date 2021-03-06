import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedCompetitionsComponent } from './joined-competitions.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionListComponent } from '../competition-list/competition-list.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CompetitionService } from '../../core/services/competition.service';
import { UserService } from '../../core/services/user.service';
import { AuthServiceMock } from '../../mocks/auth-service-mock';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionstatusPipe } from '../pipes/competitionstatus.pipe';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';

describe('JoinedCompetitionsComponent', () => {
  let component: JoinedCompetitionsComponent;
  let fixture: ComponentFixture<JoinedCompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        SweetAlert2Module.forRoot()
      ],
      declarations: [JoinedCompetitionsComponent, CompetitionListComponent, CompetitionstatusPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/joined-competitions' },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 competitions', done => {
    component.competitions.subscribe(competitions => {
      expect(competitions.length).toEqual(7);
      done();
    });
  });
});
