import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-restore',
  templateUrl: './batch-restore.component.html',
  styleUrls: ['./batch-restore.component.scss']
})
export class BatchRestoreComponent implements OnInit {
  isNoDelteData: boolean = false;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  toHome(){
    this.router.navigate(['/myBatch'])
  }

}
