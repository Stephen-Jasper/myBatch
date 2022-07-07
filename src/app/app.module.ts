import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchLoginComponent } from './batch-login/batch-login.component';
import {FormsModule} from "@angular/forms";
import { BatchHeaderComponent } from './batch-header/batch-header.component';

@NgModule({
  declarations: [
    AppComponent,
    BatchLoginComponent,
    BatchHeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
