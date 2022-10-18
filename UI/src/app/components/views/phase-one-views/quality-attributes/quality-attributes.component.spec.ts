import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAttributesComponent } from './quality-attributes.component';

describe('QualityAttributesComponent', () => {
  let component: QualityAttributesComponent;
  let fixture: ComponentFixture<QualityAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
