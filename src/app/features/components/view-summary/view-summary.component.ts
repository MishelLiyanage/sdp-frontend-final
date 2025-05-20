import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperProcessingService } from '../../../services/paper-processing.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-summary',
  imports: [CommonModule],
  templateUrl: './view-summary.component.html',
  styleUrl: './view-summary.component.scss'
})
export class ViewSummaryComponent implements OnInit {
  role: string = "";
  username: string = "";
  payload: any;

  constructor(private router: Router,
    private userService: UserService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.payload = nav?.extras?.state?.['payload'];
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;

      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );

    console.log(" ***************** " + this.payload.order.registeredNo);
    if (!this.payload) {
      alert('No order summary available');
      this.router.navigate(['/process-order']);
    }
  }

  printPage() {
    window.print();
  }

  goToProcessOrder() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }
}
