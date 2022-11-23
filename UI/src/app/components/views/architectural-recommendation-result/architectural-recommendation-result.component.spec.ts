import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalRecommendationResultComponent } from './architectural-recommendation-result.component';

describe('ArchitecturalRecommendationResultComponent', () => {
  let component: ArchitecturalRecommendationResultComponent;
  let fixture: ComponentFixture<ArchitecturalRecommendationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchitecturalRecommendationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalRecommendationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
