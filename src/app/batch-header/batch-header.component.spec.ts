import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHeaderComponent } from './batch-header.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('BatchHeaderComponent', () => {
  let component: BatchHeaderComponent;
  let fixture: ComponentFixture<BatchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchHeaderComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
