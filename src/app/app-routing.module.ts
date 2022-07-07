import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BatchLoginComponent} from "./batch-login/batch-login.component";
import {BatchHeaderComponent} from "./batch-header/batch-header.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login',
    component: BatchLoginComponent
  },
  {
    path:'myBatch',
    component: BatchHeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
