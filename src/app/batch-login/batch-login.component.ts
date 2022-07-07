import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-login',
  templateUrl: './batch-login.component.html',
  styleUrls: ['./batch-login.component.scss']
})
export class BatchLoginComponent implements OnInit, DoCheck {

  formLoginValid: boolean = true;
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
