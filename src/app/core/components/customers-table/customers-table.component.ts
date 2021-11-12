import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Customer} from "../../models/customer";
import {CustomersService} from "../../services/customers/customers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit, OnDestroy {

  subscriber: Subscription;
  customers: Customer[] = [];

  constructor(private customersService: CustomersService,
              private router: Router) {
    this.subscriber = customersService.customerStream$.subscribe(action => {
      switch (action.type) {
        case 'fetch':
          this.customers.push(action.payload);
          break;
        case 'post':
          this.customers.push(action.payload);
          break;
      }
    });

    customersService.fetchCustomers();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  openCustomerDetails() {
    this.router.navigate(['/customer']);
  }
}
