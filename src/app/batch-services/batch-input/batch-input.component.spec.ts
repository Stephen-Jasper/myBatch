import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchInputComponent } from './batch-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('BatchInputComponent', () => {
  let component: BatchInputComponent;
  let fixture: ComponentFixture<BatchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchInputComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
