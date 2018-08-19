import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompetitionComponent } from './new-competition.component';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KeysPipe } from '../../core/pipes/keys.pipe';
import { CompetitionService } from '../../core/services/competition.service';
import { CompetitionServiceMock } from '../../mocks/competition-service-mock';
import { UserService } from '../../core/services/user.service';
import { UserServiceMock } from '../../mocks/user-service-mock';
import { AuthService } from '../../core/services/auth.service';
import { AuthServiceMock } from '../../mocks/auth-service-mock';

describe('NewCompetitionComponent', () => {
  let component: NewCompetitionComponent;
  let fixture: ComponentFixture<NewCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [NewCompetitionComponent, CompetitionFormComponent, KeysPipe],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/new-competition' },
        { provide: CompetitionService, useClass: CompetitionServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
