import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { General } from 'src/app/validators/general'
import { OrderProduct } from 'src/app/common/order-product'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup
  totalPrice = 0.0
  totalAmount = 0

  private orderId: number = -1
  private clientId: number = 2
  private orderCreateError = false

  nextYears: number[] = []
  nextMonths: number[] = []
  countries = ['Brazil', 'Canada', 'UK', 'Ireland', 'Japan', 'Portugal', 'Chile', 'Uruguay']

  constructor(
    private formBuilder: FormBuilder, 
    private formService: FormService, 
    private cartService: CartService,
    private checkoutService: CheckoutService ) {

  }

  ngOnInit(): void {

    this.updateCCardYearMonth()
    this.updateOrder()

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), General.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), General.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3), General.notOnlyWhiteSpace]),
      }),
      shipping: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5), General.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), General.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required, Validators.minLength(3), General.notOnlyWhiteSpace]),
        country: [''],
        zipCode: new FormControl('', [Validators.required, Validators.minLength(8), General.notOnlyWhiteSpace]),
      }),
      creditCard: this.formBuilder.group({
        type: [''],
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(4), General.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), General.notOnlyWhiteSpace]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), General.notOnlyWhiteSpace]),
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
    // if (this.checkoutFormGroup.invalid)
    //   this.checkoutFormGroup.markAllAsTouched()
    // else {
      this.checkoutService.createOrderForClient(this.clientId).subscribe(
        res => {
          this.orderId = res.id
          const orderProducts: OrderProduct[] = []


          for (const i of this.cartService.cartItems) {
            orderProducts.push(new OrderProduct(i.amount, +i.id, this.orderId))
          }

          console.log(this.cartService.cartItems)
          console.log(orderProducts)

          this.checkoutService.addProductsToOrder(orderProducts).subscribe(
            res => {
              console.log(res)
            },
            res => {
              console.log(`error on added order products to order ${this.orderId} \n ${res.error.message}`)
            },
            () => {
              console.log(`products added to order ${this.orderId}`)
            }
          )
        },
        res => {
          console.log(`create order for client ${this.clientId} failed: ${res.error.message}`)
          this.orderCreateError = true
        },
        () => {
          console.log('order created for client')
        }
      )
    // }
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


  private updateOrder() {
    this.cartService.totalAmount.subscribe(
      data => this.totalAmount = data
    )

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
  }


  private updateCCardYearMonth() {
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
  }

}
