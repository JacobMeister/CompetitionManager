import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionKnockoutComponent } from './competition-knockout.component';

describe('CompetitionKnockoutComponent', () => {
  let component: CompetitionKnockoutComponent;
  let fixture: ComponentFixture<CompetitionKnockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionKnockoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionKnockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
