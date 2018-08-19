import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFormComponent } from './game-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { KeysPipe } from '../../core/pipes/keys.pipe';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        DlDateTimePickerDateModule
      ],
      declarations: [GameFormComponent, KeysPipe],
      providers: [{ provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
