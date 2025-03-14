import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { LoginUser } from '../../../models/login-user.model';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Map form data to LoginUser model
  getLoginData(): LoginUser {
    return {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
  }

  // Submit form data
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.getLoginData();
  
      this.loginService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
  
          const accessToken = response.access_token;  // Ensure this matches your backend response
  
          // Validate token before decoding
          if (!accessToken || typeof accessToken !== 'string') {
            console.error('Invalid or missing token:', accessToken);
            alert('Login failed. Invalid token received.');
            return;
          }
  
          // Clear old token before storing the new one
          localStorage.removeItem('accessToken');
          localStorage.setItem('accessToken', accessToken);
  
          try {
            // Decode JWT token
            const decodedToken: any = jwtDecode(accessToken);
  
            if (!decodedToken || !decodedToken.role) {
              throw new Error('Role not found in token');
            }
  
            const userRole = decodedToken.role; // Extract role from token
  
            // Navigate based on role
            switch (userRole) {
              case 'ROLE_SCHOOL':
                this.router.navigate(['/dashboards/schoolDashboard']);
                break;
              case 'ROLE_ADMIN':
                this.router.navigate(['/dashboards/adminDashboard']);
                break;
              case 'ROLE_EMPLOYEE':
                this.router.navigate(['/dashboards/employeeDashboard']);
                break;
              default:
                console.error('Unknown role:', userRole);
                alert('Unauthorized role.');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            alert('Login failed. Invalid token format.');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid username or password. Please try again.');
        }
      });
    }
  }  

  // Navigate to registration page
  goToRegistration() {
    this.router.navigate(['/auth/register']);
  }
}
