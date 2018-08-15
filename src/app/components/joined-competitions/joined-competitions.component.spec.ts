import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedCompetitionsComponent } from './joined-competitions.component';

describe('JoinedCompetitionsComponent', () => {
  let component: JoinedCompetitionsComponent;
  let fixture: ComponentFixture<JoinedCompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedCompetitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
