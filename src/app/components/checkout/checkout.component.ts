import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup
  totalPrice = 0.0
  totalAmount = 0

  constructor(private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shipping: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        type: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationDate: ['']
      })
    })
  }

  onSubmit() {
    console.log('checkout form submitted!!!')
    console.log(this.checkoutFormGroup.get('customer')!.value)
  }

}
