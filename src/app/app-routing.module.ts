import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BatchLoginComponent} from "./batch-downPage/batch-login.component";
import {BatchHeaderComponent} from "./batch-header/batch-header.component";
import {BatchDetailComponent} from "./batch-detail/batch-detail.component";
import {BatchHistoryComponent} from "./batch-history/batch-history.component";
import {NotesComponent} from "./notes/notes.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'myBatch', pathMatch: 'full'
  },
  {
    path:'404',
    component: BatchLoginComponent
  },
  {
    path:'myBatch',
    component: BatchHeaderComponent
  },
  {
    path:'myBatch/data-detail/:BchId',
    component: BatchDetailComponent
  },
  {
    path:'history',
    component: BatchHistoryComponent
  },
  {
    path:'notes',
    component: NotesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
