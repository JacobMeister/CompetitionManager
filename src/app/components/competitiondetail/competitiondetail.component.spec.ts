import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiondetailComponent } from './competitiondetail.component';

describe('CompetitiondetailComponent', () => {
  let component: CompetitiondetailComponent;
  let fixture: ComponentFixture<CompetitiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
