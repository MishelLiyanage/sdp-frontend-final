import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateSchoolProfileService } from '../../../services/update-school-profile.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-school-profile',
  templateUrl: './update-school-profile.component.html',
  styleUrl: './update-school-profile.component.scss',
  imports: [ReactiveFormsModule]
})
export class UpdateSchoolProfileComponent implements OnInit {
  updateForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder, private profileService: UpdateSchoolProfileService) {
    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      contact_no: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      principle_name: [{ value: '', disabled: true }],
      principle_signature: [{ value: null, disabled: true }],
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is missing');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    this.profileService.getCurrentUser(headers).subscribe(
      (userData) => {
        const mappedData = {
          id: userData.id,
          username: userData.username,
          role: userData.role,
          name: userData.name,
          address: userData.address,
          city: userData.city,
          contact_no: userData.contactNo,
          email: userData.email,
          principle_name: userData.principleName,
          principle_signature: userData.principleSignature
        };
  
        this.updateForm.patchValue(mappedData);
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }  

  enableEditing() {
    this.isEditing = true;
    this.updateForm.enable();
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.updateForm.patchValue({
          signature: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    if (this.updateForm.valid) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token not found');
        return;
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
  
      const formData = this.updateForm.getRawValue();
  
      this.profileService.updateProfile(formData, headers).subscribe(
        (response: any) => {
          alert(response.message); 
          this.isEditing = false;
          this.updateForm.disable();
        },
        (error) => {
          console.error('Error updating profile', error);
          alert('Error updating profile');
        }
      );
    }
  }  
}
