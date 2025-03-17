import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup
  totalPrice = 0.0
  totalAmount = 0

  nextYears: number[] = []
  nextMonths: number[] = []

  constructor(private formBuilder: FormBuilder, private formService: FormService) {

  }

  ngOnInit(): void {

    this.formService.getMonthsList(1).subscribe(
      data => {
        this.nextMonths = data
      }
    )

    this.formService.getFutureYearsList().subscribe(
      data => {
        this.nextYears = data
      }
    )

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
        expMonth: [''],
        expYear: ['']
      })
    })
  }

  onSubmit() {
    console.log('checkout form submitted!!!')
    console.log(this.checkoutFormGroup.get('customer')!.value)
  }


  updateMonthsList() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

    const currentYear = new Date().getFullYear()
    const selectedYear = Number(creditCardFormGroup?.value.expYear)

    console.log(selectedYear)
    console.log(currentYear)

    let month = 1

    if (currentYear ===  selectedYear)
      month = new Date().getMonth() + 1
    else 
      month = 1

    this.formService.getMonthsList(month).subscribe(
      data => this.nextMonths = data
    )
  }

}
