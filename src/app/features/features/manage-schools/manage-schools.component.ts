import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-schools',
  templateUrl: './manage-schools.component.html',
  styleUrls: ['./manage-schools.component.scss'],
  imports: [FormsModule,
    CommonModule
  ]
})
export class ManageSchoolsComponent {
  searchTerm: string = '';
  schools = [
    {
      name: "St. Peter's College",
      address: "Colombo 04",
      email: "contact@stpeters.edu",
      contactNumber: "011-2567890",
      username: "stpeters",
      principalName: "Rev. Fr. John Doe"
    },
    {
      name: "St. Joseph's College",
      address: "Colombo 10",
      email: "info@stjosephs.edu",
      contactNumber: "011-2233445",
      username: "stjosephs",
      principalName: "Rev. Fr. Michael Smith"
    },
    {
      name: "St. Joseph's College",
      address: "Colombo 10",
      email: "info@stjosephs.edu",
      contactNumber: "011-2233445",
      username: "stjosephs",
      principalName: "Rev. Fr. Michael Smith"
    },
    {
      name: "St. Joseph's College",
      address: "Colombo 10",
      email: "info@stjosephs.edu",
      contactNumber: "011-2233445",
      username: "stjosephs",
      principalName: "Rev. Fr. Michael Smith"
    }
  ];

  filteredSchools = [...this.schools];

  searchSchool() {
    this.filteredSchools = this.schools.filter(school =>
      school.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      school.address.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
      school.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateSchool(school: any) {
    console.log("Update school:", school);
    // Implement update logic here
  }

  deleteSchool(school: any) {
    console.log("Delete school:", school);
    this.schools = this.schools.filter(s => s !== school);
    this.filteredSchools = [...this.schools];
  }
}
