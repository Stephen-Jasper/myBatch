import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  date: Date | undefined;
  loadingDate: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
      this.loadingDate = false;
    });

  }

  editBatch(){

  }

  backToList(){
    this.router.navigate(['/myBatch'])
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
