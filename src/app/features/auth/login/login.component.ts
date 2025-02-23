import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // For standalone component
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // Create the form group with validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;
      console.log('Form submitted with:', username, password, rememberMe);
      // Implement login logic, e.g., send data to the server
    } else {
      this.errorMessage = 'Please fill in all required fields with valid data.';
    }
  }

  // Getter for username field to easily check validation
  get username() {
    return this.loginForm.get('username');
  }

  // Getter for password field to easily check validation
  get password() {
    return this.loginForm.get('password');
  }

  goToRegistration() {
    try {
    this.router.navigate(['/auth/register']);
    }
    catch (error) {
    throw new Error('Method not implemented.');
    }
  }
}
