import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLoginComponent } from './batch-login.component';

describe('BatchLoginComponent', () => {
  let component: BatchLoginComponent;
  let fixture: ComponentFixture<BatchLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
