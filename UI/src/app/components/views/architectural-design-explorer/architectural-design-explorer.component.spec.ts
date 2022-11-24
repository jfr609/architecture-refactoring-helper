import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalDesignExplorerComponent } from './architectural-design-explorer.component';

describe('ArchitecturalDesignExplorerComponent', () => {
  let component: ArchitecturalDesignExplorerComponent;
  let fixture: ComponentFixture<ArchitecturalDesignExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchitecturalDesignExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalDesignExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
