import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BatchRestore} from "../batch-dto/batch-response";
import {RestoreServiceService} from "./restore-service.service";

@Component({
  selector: 'app-batch-restore',
  templateUrl: './batch-restore.component.html',
  styleUrls: ['./batch-restore.component.scss']
})
export class BatchRestoreComponent implements OnInit {
  isNoDeletedBatch: boolean = false;
  deletedBatch: BatchRestore[];

  constructor(private router: Router,
              private restoreService: RestoreServiceService) { }

  ngOnInit(): void {
    this.getDeletedBatch();
  }

  getDeletedBatch(){
    this.restoreService.getAllDeletedBatch().toPromise().then((response) => {
      if(response){
        this.deletedBatch = response;
        if(response.length === 0){
          this.isNoDeletedBatch = true;
        }
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
  }

  executeRestore(id: string){
    this.restoreService.restoreBatch(id).toPromise().then((response) => {
      if(response){
        alert('Batch successfully restored!')
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
    window.location.reload();
  }

  executePermanentDelete(id: string){
    this.restoreService.permanentDeleteBatch(id).toPromise().then((response) => {
      if(response){
        alert('Batch has been permanently deleted!')
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
    window.location.reload();
  }

  toHome(){
    this.router.navigate(['/myBatch'])
  }

}
