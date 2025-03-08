import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../services/registration.service';
import { SchoolRegistration } from '../../../models/school-registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [ReactiveFormsModule]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  selectedFileName: string = ''; // Store the uploaded file name

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      schoolName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      principleName: ['', Validators.required],
      principleSignature: [''] // File name placeholder
    });
  }

  // Handle file upload (store only the file name for now)
  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Read file as Base64 (for backend storage)
      const reader = new FileReader();
      reader.onload = () => {
        this.registrationForm.patchValue({
          principleSignature: reader.result as string, // Base64 encoded string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Map form data to the SchoolRegistration model
  getFormData(): SchoolRegistration {
    return {
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      role: 'ROLE_SCHOOL',
      name: this.registrationForm.value.schoolName,
      address: this.registrationForm.value.address,
      contact_no: this.registrationForm.value.contactNo,
      email: this.registrationForm.value.email,
      principle_name: this.registrationForm.value.principleName,
      // principle_signature: this.registrationForm.value.principleSignature // Only file name
      principle_signature: 'defaultsignature.png'
    };
  }

  // Submit form data
  onSubmit() {
    if (this.registrationForm.valid) {
      const schoolData = this.getFormData();

      this.registrationService.registerSchool(schoolData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert(response);  // Show the plain text response
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Failed to register. Please try again.');
        }
      });
    }
  }

  // Navigate to login page
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
