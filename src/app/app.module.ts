import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from './core/components/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomersTableComponent } from './core/components/customers-table/customers-table.component';
import {RouterModule} from "@angular/router";
import {CustomerModule} from "./customer/customer.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    CustomersTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CustomerModule
  ],
  providers: [],
  exports: [
    FormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
