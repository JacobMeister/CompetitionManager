import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompetitionsComponent } from './my-competitions.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CompetitionListComponent } from '../competition-list/competition-list.component';
import { CompetitionService } from '../../core/services/competition.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';
import { AuthServiceMock } from '../../mocks/auth-service-mock';
import { CompetitionstatusPipe } from '../pipes/competitionstatus.pipe';

describe('MyCompetitionsComponent', () => {
  let component: MyCompetitionsComponent;
  let fixture: ComponentFixture<MyCompetitionsComponent>;

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
      declarations: [MyCompetitionsComponent, CompetitionListComponent, CompetitionstatusPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/my-competitions' },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 competitions', done => {
    component.competitions.subscribe(competitions => {
      expect(competitions.length).toEqual(4);
      done();
    });
  });
});
