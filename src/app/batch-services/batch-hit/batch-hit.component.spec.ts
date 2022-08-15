import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHitComponent } from './batch-hit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormBuilder} from '@angular/forms';

describe('BatchHitComponent', () => {
  let component: BatchHitComponent;
  let fixture: ComponentFixture<BatchHitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchHitComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder]
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
