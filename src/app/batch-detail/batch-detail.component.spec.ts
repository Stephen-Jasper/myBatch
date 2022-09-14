import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDetailComponent } from './batch-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormBuilder} from "@angular/forms";

describe('BatchDetailComponent', () => {
  let component: BatchDetailComponent;
  let fixture: ComponentFixture<BatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show popup edit', () => {
    component.editBatch();
    expect(component.showPopupEdit).toBeTruthy();
  });
});
