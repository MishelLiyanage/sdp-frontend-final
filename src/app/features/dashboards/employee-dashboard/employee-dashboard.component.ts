import { Component } from '@angular/core';
import { PageStartingContainerComponent } from "../../components/page-starting-container/page-starting-container.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [PageStartingContainerComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  scrumboard() {
    this.router.navigate(['/features/scrumboard']);
  }

  constructor (private router: Router) {}
  
  manageSchools() {
    this.router.navigate(['/features/manageSchools']);
  }
  
  title: string = 'Welcome To Employee Portal';
  description: string = 'Empowering with seamless access to high-quality examination resources';
}
