import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchLoginComponent } from './batch-login/batch-login.component';
import {FormsModule} from "@angular/forms";
import { BatchHeaderComponent } from './batch-header/batch-header.component';
import { BatchServicesComponent } from './batch-services/batch-services.component';
import { BatchHitComponent } from './batch-services/batch-hit/batch-hit.component';
import { BatchDetailComponent } from './batch-services/batch-detail/batch-detail.component';
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BatchLoginComponent,
    BatchHeaderComponent,
    BatchServicesComponent,
    BatchHitComponent,
    BatchDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
