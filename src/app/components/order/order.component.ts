import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Cart, Order, Payment, PaymentMethod } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedPaymentMethodName: string = '';
  selectedPaymentMethod = new FormControl('0')
  address = ''
  mobileNumber = ''
  displaySpinner = false;
  message = ''
  className = ''

  paymentMethods: PaymentMethod[] = [];

  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: ''
  }

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shippingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //* Get Payment Methods
    this.navigationService.getPaymentMethods().subscribe((res) => {
      this.paymentMethods = res
    })


    //* Sirve para verificar el options del formulario y saber que metodo de pago se elige
    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });

    //* Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res
        this.utilityService.calculatePayment(res, this.usersPaymentInfo)
      })

    //* Set address and phone number
    this.address = this.utilityService.getUser().address;
    this.mobileNumber = this.utilityService.getUser().mobile;
    console.log(this.utilityService.getUser())
  }

  getPaymentMethod(id: string) {
    let paymentMethod = this.paymentMethods.find((method) => method.id === parseInt(id));
    return paymentMethod?.type + ' - ' + paymentMethod?.provider;
  }

  placeOrder() {
    this.displaySpinner = true;
    let isPaymentSuccessfull = this.payMoney();

    if (!isPaymentSuccessfull) {
      this.displaySpinner = false;
      this.message = 'Somenthing went wrong! Payment did not happen'
      this.className = 'text-danger'
      return
    }

    let step = 0
    let count = timer(0, 3000).subscribe((res) => {
      ++step;
      if (step === 1) {
        this.message = 'Processing Payment';
        this.className = 'text-success'
      }
      if (step === 2) {
        this.message = 'Payment Successfull, order has been placed'
        this.storeOrder()
        this.displaySpinner = false;
      }
      if (step === 4) {
        this.router.navigateByUrl('/home');
        count.unsubscribe()
      }
    })

  }

  payMoney() {
    return true
  }

  storeOrder() {
    let payment: Payment;
    let pmid = 0;

    if (this.selectedPaymentMethod.value){
      pmid = parseInt(this.selectedPaymentMethod.value)
    }

    payment = {
      id: 0,
      paymentMethod: {
        id: pmid,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      user: this.utilityService.getUser(),
      totalAmount: this.usersPaymentInfo.totalAmount,
      shippingCharges: this.usersPaymentInfo.shippingCharges,
      amountReduced: this.usersPaymentInfo.amountReduced,
      amountPaid: this.usersPaymentInfo.amountPaid,
      createdAt: ''
    }

    this.navigationService
      .insertPayment(payment)
      .subscribe((paymentResponse: any) => {
        payment.id = parseInt(paymentResponse);
        let order: Order = {
          id: 0,
          user: this.utilityService.getUser(),
          cart: this.usersCart,
          payment: payment,
          createdAt: ''
        }

        this.navigationService
          .insertOrder(order)
          .subscribe((orderResponse) => {
            this.utilityService.changeCart.next(0);
          })

      })

  }
}
