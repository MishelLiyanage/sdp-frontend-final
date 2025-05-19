import { Component } from '@angular/core';
import { PageStartingContainerComponent } from '../../components/page-starting-container/page-starting-container.component';
import { HowToOrderComponent } from "../../components/how-to-order/how-to-order.component";
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-school-dashboard',
  imports: [PageStartingContainerComponent, HowToOrderComponent],
  templateUrl: './school-dashboard.component.html',
  styleUrl: './school-dashboard.component.scss'
})
export class SchoolDashboardComponent {
  username: string = "";

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username; 
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );
    
  }

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

  constructor (private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {}

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

  logout() {
    this.loginService.logout();
  }
}
