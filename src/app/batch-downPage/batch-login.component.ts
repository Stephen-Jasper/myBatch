import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-login',
  templateUrl: './batch-down.component.html',
  styleUrls: ['./batch-down.component.scss']
})
export class BatchLoginComponent implements OnInit, DoCheck {

  formLoginValid: boolean = true;
  errorAuth: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if(this.username !== '' && this.password !== ''){
      this.formLoginValid = false;
    }else{
      this.formLoginValid = true;
    }
  }

  validationAccount(){

  }

  submit(){
    this.router.navigate(['/myBatch']);
  }
}
