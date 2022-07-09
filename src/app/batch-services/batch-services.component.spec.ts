import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchServicesComponent } from './batch-services.component';

describe('BatchServicesComponent', () => {
  let component: BatchServicesComponent;
  let fixture: ComponentFixture<BatchServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
