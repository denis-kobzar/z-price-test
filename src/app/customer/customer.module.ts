import { NgModule } from '@angular/core';

import {RouterModule} from "@angular/router";
import {CustomerComponent} from "./customer.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent
      }
    ]),
    CommonModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class CustomerModule { }
