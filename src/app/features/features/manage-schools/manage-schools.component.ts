import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-schools',
  templateUrl: './manage-schools.component.html',
  styleUrls: ['./manage-schools.component.scss'],
  imports: [FormsModule,
    CommonModule
  ]
})
export class ManageSchoolsComponent {
  role: string = "";
  username: string = "";
  searchTerm: string = '';
  schools: School[] = [];
  filteredSchools: School[] = [];

  constructor(private schoolService: SchoolService,
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

    this.loadSchools();
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

  loadSchools() {
    this.schoolService.getSchools().subscribe(
      (data: School[]) => {
        console.log('Schools:', data);
        this.schools = data;
        this.filteredSchools = [...this.schools];
      },
      (error) => {
        console.error('Error fetching schools:', error);
      }
    );
  }
  searchSchool() {
    this.filteredSchools = this.schools.filter(school =>
      school.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      school.address.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
      school.city.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
      school.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateSchool(school: School) {
    this.router.navigate(['/features/updateSchool'], { state: { school } });
  }

  // deleteSchool(school: School) {
  //   console.log('Deleting school:', school.email);
  //   this.schoolService.deleteSchool(school.email).subscribe(
  //     () => {
  //       console.log('School deleted:', school);
  //       this.schools = this.schools.filter(o => o.schoolId !== school.schoolId);
  //       this.filteredSchools = [...this.schools];

  //       alert('Order deleted successfully!');
  //     },
  //     (error) => console.error('Error deleting order:', error)
  //   );
  // }

  print() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore original state
    }
  }

  getUserRoleFromToken(token: string): string | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return tokenPayload.role || null; // Assuming 'role' field is present
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }
}
