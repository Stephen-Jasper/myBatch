import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchLoginComponent } from './batch-login/batch-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BatchHeaderComponent } from './batch-header/batch-header.component';
import { BatchServicesComponent } from './batch-services/batch-services.component';
import { BatchHitComponent } from './batch-services/batch-hit/batch-hit.component';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatchServicesService } from "./batch-services/batch-services.service";
import { BatchInputComponent } from './batch-services/batch-input/batch-input.component';
import { NavbarComponent } from './batch-header/navbar/navbar.component';
import { DateTimeComponent } from './utils/date-time/date-time.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    BatchLoginComponent,
    BatchHeaderComponent,
    BatchServicesComponent,
    BatchHitComponent,
    BatchDetailComponent,
    BatchInputComponent,
    NavbarComponent,
    DateTimeComponent,
    BatchHistoryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatExpansionModule,
    ],
    exports: [
    ],
  providers: [BatchServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
