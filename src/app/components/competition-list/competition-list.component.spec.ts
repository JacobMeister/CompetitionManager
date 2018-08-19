import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionListComponent } from './competition-list.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CompetitionstatusPipe } from '../pipes/competitionstatus.pipe';
import { CompetitionService } from '../../core/services/competition.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { UserServiceMock } from '../../mocks/user-service-mock';
import { AuthServiceMock } from '../../mocks/auth-service-mock';

describe('CompetitionListComponent', () => {
  let component: CompetitionListComponent;
  let fixture: ComponentFixture<CompetitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        SweetAlert2Module
      ],
      declarations: [CompetitionListComponent, CompetitionstatusPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
