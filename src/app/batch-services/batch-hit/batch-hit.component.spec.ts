import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

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

  it('should show popup edit', () => {
    const fitId = '1';
    const fitName = 'SJR';
    const devUrl = 'https://dev';
    const uatUrl = 'https://uat';
    component.showPopupEdit(fitId, fitName, devUrl, uatUrl);
    expect(component.popUpEdit).toBeTruthy();
    expect(component.selectedFitId).toEqual(fitId);
    expect(component.selectedFitName).toEqual(fitName);
    expect(component.selectedDevUrl).toEqual(devUrl);
    expect(component.selectedUatUrl).toEqual(uatUrl);
  });

  // it('should get the data', fakeAsync( () => {
  //   batchService.getAllBatchData.and.returnValue(of({
  //     batch_id: '1',
  //     category_id: '2',
  //     batch_name: 'SJR',
  //     description: 'SJR',
  //     request_method: 'GET',
  //     environment: 'DEV',
  //     main_url: 'string',
  //     endpoint: 'string',
  //   }));
  //   spyOn(component, 'getBatchData');
  //   tick();
  //   expect(component.getBatchData).toHaveBeenCalled();
  // }));
});
