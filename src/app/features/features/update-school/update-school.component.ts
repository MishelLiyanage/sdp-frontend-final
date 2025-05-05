import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService } from '../../../services/school.service';
import { SchoolDetails } from '../../../models/school-details.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-school',
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-school.component.html',
  styleUrl: './update-school.component.scss'
})
export class UpdateSchoolComponent implements OnInit {
  updateSchoolForm!: FormGroup;
  schoolId!: number;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateSchoolForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      principleName: ['', Validators.required]
    });

    const school: SchoolDetails = history.state.school;

    if (school) {
      this.schoolId = school.schoolId;
      this.updateSchoolForm.patchValue(school);
    } else {
      alert('No school data provided.');
      this.router.navigate(['/features/school-list']);
    }
  }

  onUpdateSchool(): void {
    if (this.updateSchoolForm.valid) {
      const updatedSchool: SchoolDetails = {
        id: this.schoolId,
        ...this.updateSchoolForm.value
      };

      this.schoolService.updateSchool(updatedSchool).subscribe(
        () => {
          alert('School updated successfully!');
          this.router.navigate(['/features/manageSchools']);
        },
        (error) => {
          console.error('Error updating school:', error);
          alert('Failed to update school.');
        }
      );
    }
  }

  navigateToSchoolList() {
    this.router.navigate(['/features/manageSchools']);
  }
}
