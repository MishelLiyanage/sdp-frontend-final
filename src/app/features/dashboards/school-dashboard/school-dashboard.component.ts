import { Component } from '@angular/core';
import { PageStartingContainerComponent } from '../../components/page-starting-container/page-starting-container.component';
import { HowToOrderComponent } from "../../components/how-to-order/how-to-order.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-dashboard',
  imports: [PageStartingContainerComponent, HowToOrderComponent],
  templateUrl: './school-dashboard.component.html',
  styleUrl: './school-dashboard.component.scss'
})
export class SchoolDashboardComponent {
  updateProfile() {
    this.router.navigate(['/features/updateSchoolProfile']);
  }

  goToMyOrders() {
    try {
      this.router.navigate(['/features/myOrders']);
    }
    catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  constructor (private router: Router) {}
  goToPlaceOrder() {
    try {
      this.router.navigate(['/features/placeOrder']);
    }
    catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  title: string = 'Welcome To School Portal';
  description: string = 'Empowering with seamless access to high-quality examination resources';
}
