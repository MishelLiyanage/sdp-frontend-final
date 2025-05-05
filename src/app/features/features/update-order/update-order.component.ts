import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { OrderDetails } from '../../../models/order-details.model';

@Component({
  selector: 'app-update-order',
  imports: [CommonModule,
    ReactiveFormsModule],
  standalone: true,
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss'
})
export class UpdateOrderComponent implements OnInit {
  updateOrderForm!: FormGroup;
  orderId!: String;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm format
    const todayDate = currentDate.toISOString().split('T')[0]; // yyyy-mm-dd

    this.updateOrderForm = this.fb.group({
      schoolName: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      paymentStatus: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      date: [{ value:todayDate, disabled: true }, Validators.required],
      time: [{ value:currentTime, disabled: true }, Validators.required],
      amount: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]]
    });

    const order: OrderDetails = history.state.order;

    if (order) {
      this.orderId = order.orderId;
      this.updateOrderForm.patchValue({
        schoolName: order.schoolName,
        city: order.city,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        date: todayDate,
        time: currentTime, // ⏰ Now using system time
        amount: order.amount
      });
    } else {
      console.warn('No order object found in navigation state.');
      this.router.navigate(['/features/order-list']);
    }
  }

  /** 🔹 Update Order */
  onUpdateOrder(): void {
    if (this.updateOrderForm.valid) {
      const updatedOrder: OrderDetails = {
        orderId: this.orderId,
        ...this.updateOrderForm.value
      };

      console.log('Updated Order:', updatedOrder);

      this.orderService.updateOrder(updatedOrder).subscribe(
        (response) => {
          console.log('Order updated successfully:', response);
          alert('Order updated successfully!');
          this.router.navigate(['/features/manageOrders']);
        },
        (error) => {
          console.error('Error updating order:', error);
          alert('Failed to update order.');
        }
      );
    }
  }

  navigateToManageOrders() {
    this.router.navigate(['/features/manageOrders']);
  }
}
