import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTournamentComponent } from './competition-tournament.component';

describe('CompetitionTournamentComponent', () => {
  let component: CompetitionTournamentComponent;
  let fixture: ComponentFixture<CompetitionTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
