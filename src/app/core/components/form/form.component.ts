import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../../services/customers/customers.service";
import {Customer} from "../../models/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  action: string;
  customer: Customer = {
    id: '',
    fullName: '',
    phone: '',
    email: '',
    address: ''
  };
  customerForm: FormGroup;

  constructor(private customersService: CustomersService) {
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
  }

  ngOnInit(): void {
  }

  addCustomer() {
    if (this.emptyForm()) {
      this.customersService.postCustomer(this.customer);

      this.customerForm.reset();
    }
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
}
