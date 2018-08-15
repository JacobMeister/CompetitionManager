import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPouleComponent } from './competition-poule.component';

describe('CompetitionPouleComponent', () => {
  let component: CompetitionPouleComponent;
  let fixture: ComponentFixture<CompetitionPouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionPouleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
