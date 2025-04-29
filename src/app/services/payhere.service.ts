import { Injectable } from '@angular/core';
import { PaymentService } from './payment.service'; // <-- Import your PaymentService
import { Payment } from '../models/payment.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PayhereService {

  private sdkLoaded: boolean = false;
  private sdkLoadingPromise: Promise<void>;

  private currentUserId!: number;
  private currentAmount!: number;
  private currentPaymentMethod!: string;
  private currentOrderId!: number;

  constructor(private paymentService: PaymentService, private router: Router) { // <-- Inject PaymentService
    this.sdkLoadingPromise = this.loadPayhereSdk();
  }

  private loadPayhereSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).payhere) {
        this.sdkLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.payhere.lk/lib/payhere.js'; // PayHere SDK
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        this.sdkLoaded = true;
        console.log('PayHere SDK loaded successfully.');
        resolve();
      };

      script.onerror = (error) => {
        console.error('Failed to load PayHere SDK:', error);
        reject(error);
      };

      document.body.appendChild(script);
    });
  }

  async payNow(
    merchant_id: string,
    order_id: number,
    items: string,
    amount: number,
    hash: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    currency: string,
    notify_url: string,
    userId: number,          
    paymentMethod: string       
  ) {
    try {
      await this.sdkLoadingPromise; // Wait until PayHere SDK is loaded
    } catch (error) {
      console.error('Cannot proceed with payment. SDK load failed.');
      return;
    }

    if (!(window as any).payhere) {
      console.error('PayHere SDK is not available.');
      return;
    }

    // Store user info temporarily to use it after payment completion
    this.currentUserId = userId;
    this.currentAmount = amount;
    this.currentPaymentMethod = paymentMethod;
    this.currentOrderId = order_id;

    console.log('Current User ID:1', this.currentUserId);
    console.log('Current Amount:2', this.currentAmount);
    console.log('Current Payment Method:3', this.currentPaymentMethod);
    console.log('OrderId:4', order_id);

    (window as any).payhere.onCompleted = (orderId: string) => {
      console.log("Payment completed. OrderID: " + orderId);
    };

    (window as any).payhere.onDismissed = () => {
      console.log("Payment dismissed.");

      // Save payment details AFTER successful payment
      const paymentDetails = new Payment(
        this.currentUserId,
        this.currentOrderId,
        this.currentAmount,
        this.currentPaymentMethod
      );

      this.paymentService.savePayment(paymentDetails).subscribe(
        (response) => {
          console.log('Payment details saved successfully:', response);
          alert("Payment successful and payment details saved.");
          this.router.navigate(['/dashboards/schoolDashboard']);
        },
        (error) => {
          console.error('Error saving payment details:', error);
          alert("Payment successful, but failed to save payment details.");
        }
      );
    };

    (window as any).payhere.onError = (error: any) => {
      console.error("Payment error: " + error);
    };

    const payment = {
      sandbox: true, // Change to false in production
      merchant_id: merchant_id,
      return_url: "http://localhost:4200/payment-success",  // Set correct URLs
      cancel_url: "http://localhost:4200/payment-cancel",
      notify_url: notify_url,
      order_id: order_id,
      items: items,
      amount: amount,
      currency: currency,
      hash: hash,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: country
    };

    if (payment && payment.order_id && payment.amount !== undefined) {
      (window as any).payhere.startPayment(payment);
    } else {
      console.error('Invalid payment object: ', payment);
    }
  }
}
