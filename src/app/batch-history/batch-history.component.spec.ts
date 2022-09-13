import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import { BatchHistoryComponent } from './batch-history.component';

describe('BatchHistoryComponent', () => {
  let component: BatchHistoryComponent;
  let fixture: ComponentFixture<BatchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchHistoryComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
