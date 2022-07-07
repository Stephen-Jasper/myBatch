import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-batch-header',
  templateUrl: './batch-header.component.html',
  styleUrls: ['./batch-header.component.scss']
})
export class BatchHeaderComponent implements OnInit {
  date: Date | undefined;

  constructor() { }

  ngOnInit(): void {
    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
    });
  }

}
