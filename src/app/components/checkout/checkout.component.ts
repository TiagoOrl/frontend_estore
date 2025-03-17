import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  countries = ['Brazil', 'Canada', 'UK', 'Ireland', 'Japan', 'Portugal', 'Chile', 'Uruguay']

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
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      }),
      shipping: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3)]),
        state: new FormControl('', [Validators.required, Validators.minLength(3)]),
        country: [''],
        zipCode: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }),
      creditCard: this.formBuilder.group({
        type: [''],
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(4)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
        expMonth: [''],
        expYear: ['']
      })
    })
  }


  get firstName() {return this.checkoutFormGroup.get('customer.firstName')}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName')}
  get email() {return this.checkoutFormGroup.get('customer.email')}

  get street() {return this.checkoutFormGroup.get('shipping.street')}
  get city() {return this.checkoutFormGroup.get('shipping.city')}
  get state() {return this.checkoutFormGroup.get('shipping.state')}
  get country() {return this.checkoutFormGroup.get('shipping.country')}
  get zipCode() {return this.checkoutFormGroup.get('shipping.zipCode')}

  get ccardType() {return this.checkoutFormGroup.get('creditCard.type')}
  get ccardName() {return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get ccardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber')}
  get ccardSecurityCode() {return this.checkoutFormGroup.get('creditCard.securityCode')}

  



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
