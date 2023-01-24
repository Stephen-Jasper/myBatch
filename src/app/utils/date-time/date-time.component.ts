import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  date: Date | undefined;
  loadingDate: boolean = true;
  time: string;

  constructor() { }

  ngOnInit(): void {
    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
      this.loadingDate = false;
      this.time = this.date.getHours() > 12 ? 'PM' : 'AM';
    });
  }

}
