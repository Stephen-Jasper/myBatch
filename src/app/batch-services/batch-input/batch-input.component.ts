import { Component, OnInit } from '@angular/core';
import {CategoryData} from "../../batch-dto/batch-response";

@Component({
  selector: 'app-batch-input',
  templateUrl: './batch-input.component.html',
  styleUrls: ['./batch-input.component.scss']
})
export class BatchInputComponent implements OnInit {

  dataCat: CategoryData[];
  constructor() { }

  ngOnInit(): void {
  }

}
