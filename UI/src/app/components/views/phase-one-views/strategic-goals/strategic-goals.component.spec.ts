import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicGoalsComponent } from './strategic-goals.component';

describe('StrategicGoalsComponent', () => {
  let component: StrategicGoalsComponent;
  let fixture: ComponentFixture<StrategicGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
