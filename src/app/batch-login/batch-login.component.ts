import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-batch-login',
  templateUrl: './batch-login.component.html',
  styleUrls: ['./batch-login.component.scss']
})
export class BatchLoginComponent implements OnInit, DoCheck {

  formLoginValid: boolean = true;
  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if(this.username !== '' && this.password !== ''){
      this.formLoginValid = false;
    }
  }

  validationAccount(){

  }

  submit(){

  }
}
