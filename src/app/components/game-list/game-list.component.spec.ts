import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GamestatusPipe } from '../pipes/gamestatus.pipe';

describe('GameslistComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), BrowserModule, CommonModule, FormsModule, NgbModule.forRoot()],
      declarations: [GameListComponent, GamestatusPipe],
      providers: [{ provide: APP_BASE_HREF, useValue: '/competition/oDJcCFO0HKB1MIDvmYBi' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
