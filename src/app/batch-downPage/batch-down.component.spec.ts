import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLoginComponent } from './batch-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('BatchLoginComponent', () => {
  let component: BatchLoginComponent;
  let fixture: ComponentFixture<BatchLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchLoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
