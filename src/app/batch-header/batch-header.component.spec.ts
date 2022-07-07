import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHeaderComponent } from './batch-header.component';

describe('BatchHeaderComponent', () => {
  let component: BatchHeaderComponent;
  let fixture: ComponentFixture<BatchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
