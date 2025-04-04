import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';

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
  schools: School[] = [];
  filteredSchools: School[] = [];

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.loadSchools();
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
      school.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateSchool(school: any) {
    console.log("Update school:", school);
    
    
  }

  deleteSchool(school: any) {
    console.log("Delete school:", school);
    this.schools = this.schools.filter(s => s !== school);
    this.filteredSchools = [...this.schools];
  }
}
