import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalDesignViewComponent } from './architectural-design-view.component';

describe('ArchitecturalDesignViewComponent', () => {
  let component: ArchitecturalDesignViewComponent;
  let fixture: ComponentFixture<ArchitecturalDesignViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchitecturalDesignViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalDesignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
