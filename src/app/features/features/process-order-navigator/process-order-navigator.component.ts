import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-order-navigator',
  imports: [CommonModule],
  templateUrl: './process-order-navigator.component.html',
  styleUrl: './process-order-navigator.component.scss'
})
export class ProcessOrderNavigatorComponent {
  role: string = "";
  username: string = "";

  papersets = [
    { grade: "Grade 5", category: "Scholarship Tamil" },
    { grade: "Grade 4", category: "Scholarship Tamil" },
    { grade: "Grade 3", category: "Scholarship Tamil" },
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
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
  }

  goToDashboard() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }

  }

  logout() {
    this.loginService.logout();
  }

  onPapersetClick(paperset: any) {
    if (paperset.grade === "Grade 5" && paperset.category === "Scholarship Tamil") {
      this.router.navigate(['/features/processOrders']);
    } else if (paperset.grade === "Grade 4" && paperset.category === "Scholarship Tamil") {
    }else if (paperset.grade === "Grade 3" && paperset.category === "Scholarship Tamil") {
      this.router.navigate(['/features/processOrdersGrade3ScholarshipTamil']);
    } else {
      console.error("Invalid paperset");
    }
  }

}
