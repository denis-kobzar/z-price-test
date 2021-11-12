import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Customer} from "../core/models/customer";
import {CustomersService} from "../core/services/customers/customers.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  customer: Customer = {
    id: '',
    fullName: '',
    phone: '',
    email: '',
    address: ''
  };
  subscriber: Subscription;
  editMode: boolean = false;
  customerForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private customersService: CustomersService) {
    this.route.params.subscribe(params => {
      this.customer.id = params.id;
      this.subscriber = customersService.customerStream$.subscribe(action => {
        switch (action.type) {
          case 'getById':
            this.customer = action.payload;

            this.customerForm = new FormGroup({
              fullName: new FormControl(this.customer.fullName, [
                Validators.required,
                Validators.minLength(2)
              ]),
              phone: new FormControl(this.customer.phone, [
                Validators.required,
                Validators.pattern('\\+\\d{12}$')
              ]),
              email: new FormControl(this.customer.email, [
                Validators.required,
                Validators.email
              ]),
              address: new FormControl(this.customer.address, [
                Validators.required,
                Validators.minLength(2)
              ])
            });

            this.customerForm.get('fullName').valueChanges.subscribe(v => {
              this.customer.fullName = v;
            });

            this.customerForm.get('phone').valueChanges.subscribe(v => {
              this.customer.phone = v;
            });

            this.customerForm.get('email').valueChanges.subscribe(v => {
              this.customer.email = v;
            });

            this.customerForm.get('address').valueChanges.subscribe(v => {
              this.customer.address = v;
            });
            break;
          case 'put':
            this.customer = action.payload;
            this.editMode = false;
            break;
        }
      })
      customersService.getById(this.customer.id);
    });
  }

  ngOnInit(): void {
  }

  remove() {
    this.customersService.remove(this.customer.id);
  }

  edit() {
    this.editMode = true;
    console.log('Customer ', this.customer);
  }

  emptyForm(): boolean {
    if (this.customer.fullName.trim() &&
      this.customer.phone.trim() &&
      this.customer.email.trim() &&
      this.customer.address.trim())
      return true;
    else
      return false;
  }

  putCustomer() {
    if (this.emptyForm()) {
      this.customersService.putCustomer(this.customer.id, this.customer);

      this.customerForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
