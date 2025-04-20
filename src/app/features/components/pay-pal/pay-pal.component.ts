import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pay-pal',
  imports: [],
  templateUrl: './pay-pal.component.html',
  styleUrl: './pay-pal.component.scss'
})

export class PayPalComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize any required logic before the PayPal button loads (if necessary)
  }

  ngAfterViewInit(): void {
    // This is where you can load the PayPal button
    this.loadPayPalScript().then(() => {
      this.renderPayPalButton();
    });
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('paypal-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-script';
      script.src = 'https://www.paypal.com/sdk/js?client-id=AW8iW-bzmAmB74NmzmJfHP578eex-x83XNlEJAHvjOWxH_D3n_Tz3is6z_edEzh-FtiGGlVoCmpH_UI-&currency=USD';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  renderPayPalButton(): void {
    if (window['paypal']) {
      window['paypal'].Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '100.00' // Replace with the actual amount to be charged
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Payment successful: ' + details.payer.name.given_name);
            // Handle successful payment here (e.g., notify your server)
          });
        }
      }).render('#paypal-button-container');
    }
  }

  ngOnDestroy(): void {
    const paypalScript = document.getElementById('paypal-script');
    if (paypalScript) {
      paypalScript.remove();
    }
  }
}

