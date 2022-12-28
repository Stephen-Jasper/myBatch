import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchRestoreComponent } from './batch-restore.component';

describe('BatchRestoreComponent', () => {
  let component: BatchRestoreComponent;
  let fixture: ComponentFixture<BatchRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchRestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
