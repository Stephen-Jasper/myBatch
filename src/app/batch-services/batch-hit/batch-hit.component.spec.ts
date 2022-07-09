import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHitComponent } from './batch-hit.component';

describe('BatchHitComponent', () => {
  let component: BatchHitComponent;
  let fixture: ComponentFixture<BatchHitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchHitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
