import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchLoginComponent } from './batch-login/batch-login.component';
import {FormsModule} from "@angular/forms";
import { BatchHeaderComponent } from './batch-header/batch-header.component';
import { BatchServicesComponent } from './batch-services/batch-services.component';
import { BatchHitComponent } from './batch-services/batch-hit/batch-hit.component';

@NgModule({
  declarations: [
    AppComponent,
    BatchLoginComponent,
    BatchHeaderComponent,
    BatchServicesComponent,
    BatchHitComponent
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
